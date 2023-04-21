import { useTranslation } from 'next-i18next'
import { TriStateSwitch, TriStateSwitchState } from './TriStateSwitch'
import { Question, questions as allQuestions } from '../public/questions'
import { useEffect } from 'react'
import { DeepPartial, reduceToObject, unique } from '../helpers/helpers'
import { useForm } from 'react-hook-form'
// import { updatedDiff } from 'deep-object-diff'

const possibleDeepnessLevels = allQuestions.map( e => e.deepness ).filter( unique ).sort()
const allTags = allQuestions.filter( e => Array.isArray( e.tags ) ).map( e => e.tags as string[] ).flat().filter( unique )
const DEFAULT_TAG_STATE: TriStateSwitchState = 'IGNORE'

export interface FiltersProps {
  allQuestions: Question[]
  currentQuestions: Question[]
  setQuestions( q: Question[] ): void
  setShowAuthors( showAuthor: boolean ): void
}

interface FiltersObject {
  tags: Record<string, TriStateSwitchState>
  minDeepness: string
  maxDeepness: string
  randomness: string
  showAuthors: boolean
}

const defaultFiltersObject: FiltersObject = {
  tags: allTags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( reduceToObject, {} ),
  minDeepness: possibleDeepnessLevels[0].toString(),
  maxDeepness: possibleDeepnessLevels[possibleDeepnessLevels.length-1].toString(),
  randomness: '0',
  showAuthors: true,
}

const filterQuestions = ( questions: Question[], value: DeepPartial<FiltersObject> ): Question[] => {
  const { minDeepness, maxDeepness, tags, randomness } = value
  let filtered = questions
  if ( minDeepness )
    filtered = filtered.filter( e => e.deepness >= Number.parseInt( minDeepness ) )
  if ( maxDeepness )
    filtered = filtered.filter( e => e.deepness <= Number.parseInt( maxDeepness ) )
  if ( tags )
    filtered = filtered.filter( e => filterTags( e, tags ) )
  if ( randomness )
    filtered = filtered
      .sort( ( ) => Math.random()-0.5 )
      .sort( ( a,b ) =>
        Number.parseInt( randomness ) > Math.random() ?
          Math.random() - 0.5 :
          a.deepness - b.deepness + ( Math.random() / 10 - 0.05 )
      )

  return filtered
}

const filterTags = ( q: Question, tags: Record<string, TriStateSwitchState|undefined> ): boolean => {
  const requiredTags = Object.entries( tags ).filter( e => e[1] === 'REQUIRE' ).map( e => e[0] )
  const prohibitedTags = Object.entries( tags ).filter( e => e[1] === 'PROHIBIT' ).map( e => e[0] )
  if ( !requiredTags.every( tag => q.tags?.includes( tag ) ) ) return false
  if ( prohibitedTags.some( tag => q.tags?.includes( tag ) ) ) return false
  return true
}

export const Filters = ( { allQuestions, currentQuestions, setQuestions, setShowAuthors }: FiltersProps ): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'filters' } )
  const { register, handleSubmit, watch, setValue } = useForm( { defaultValues:defaultFiltersObject } )

  useEffect( () => {
    const subscription = watch( ( value ) => {
      setQuestions( filterQuestions( allQuestions, value ) )
      if ( value.showAuthors !== undefined ) setShowAuthors( value.showAuthors )
      // const diff = updatedDiff( defaultFiltersObject, value )
    } )
    return () => subscription.unsubscribe()
  }, [watch, allQuestions, setQuestions, setShowAuthors] )

  return (
    <form onSubmit={handleSubmit( () => {} )}>
      <fieldset>
        <h2 className='mx-auto w-fit'>{t( 'title' )}</h2>
        <p className={`mx-auto w-fit ${currentQuestions.length === 0 && 'text-red-400'}`}>
          {currentQuestions.length} {t( 'questionsLeft' )}
        </p>
      </fieldset>
      <fieldset>
        <h3>{t( 'tags' )}</h3>
        {
          allTags.map( tag =>
            (
              <TriStateSwitch
                key={tag}
                text={tag}
                state={watch( `tags.${tag}` ) }
                setIfUnchanged={false}
                setState={( newState: TriStateSwitchState ): void => setValue( `tags.${tag}`, newState, {} ) }
              />
            )
          )
        }
      </fieldset>
      <fieldset>
        <h3>{t( 'deepness' )}</h3>
        <div className='mx-auto flex flex-row flex-wrap justify-center'>
          <label className='flex flex-col m-3'>
            <p className='w-max'>{t( 'minDeepness' )}</p>
            <select {...register( 'minDeepness' )}>
              {
                possibleDeepnessLevels.map( e => (
                  <option key={e} disabled={e > Number.parseInt( watch( 'maxDeepness' ) )}>
                    {e}
                  </option>
                ) )
              }
            </select>
          </label>
          <label className='flex flex-col m-3'>
            <p className='w-max'>{t( 'maxDeepness' )}</p>
            <select {...register( 'maxDeepness' )}>
              {
                possibleDeepnessLevels.map( e => (
                  <option key={e} disabled={e < Number.parseInt( watch( 'minDeepness' ) )}>
                    {e}
                  </option>
                ) )
              }
            </select>
          </label>
        </div>
        <label className='w-max mx-auto'>
          <h4 className='mx-auto w-fit'>{t( 'order' )}</h4>
          <div className='flex items-center justify-between'>
            <p className='mr-10'>{t( 'byDeepness' )}</p>
            <p className='ml-auto'>{t( 'trueRandom' )}</p>
          </div>
          <input
            type="range"
            step="any"
            min="0"
            max="1"
            className='h-1 bg-white rounded appearance-none w-full'
            {...register( 'randomness' )}
          />
        </label>
      </fieldset>
      <fieldset>
        <h3>{t( 'authors' )}</h3>
        <label className='w-max mx-auto mt-1 w-max'>
          {t( 'showAuthors' )}
          <input
            type="checkbox"
            className='ml-3'
            {...register( 'showAuthors' )}
          />
        </label>
      </fieldset>
    </form>
  )
}
