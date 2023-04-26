import { useTranslation } from 'next-i18next'
import { TriStateSwitch, TriStateSwitchState } from './TriStateSwitch'
import { Question, questions as allQuestions } from '../../public/questions'
import { useEffect } from 'react'
import { DeepPartial, reduceToObject, unique } from '../../helpers/helpers'
import { Controller, useForm } from 'react-hook-form'
import { updatedDiff } from 'deep-object-diff'
import { useRouter } from 'next/router'
import qs from 'qs'
import defaultsDeep from 'lodash.defaultsdeep'
import { ErrorMessage } from '../ErrorMessage'
import { EllipsisSwitch } from '../EllipsisSwitch'
import { FiltersTitle } from './FiltersTitle'
import { Tags } from './Explanations/Tags'
import { Deepness } from './Explanations/Deepness'
import { Order } from './Explanations/Order'
import { Authors } from './Explanations/Authors'

const possibleDeepnessLevels = allQuestions.map( e => e.deepness ).filter( unique ).sort()
const allTags = allQuestions.filter( e => Array.isArray( e.tags ) ).map( e => e.tags as string[] ).flat().filter( unique )
const DEFAULT_TAG_STATE: TriStateSwitchState = 'IGNORE'
export const QUERY_INDEX = 'filters'

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
  sets: boolean
  showAuthors: boolean
}

const defaultValues: FiltersObject = {
  tags: allTags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( reduceToObject, {} ),
  minDeepness: possibleDeepnessLevels[0].toString(),
  maxDeepness: possibleDeepnessLevels[possibleDeepnessLevels.length-1].toString(),
  randomness: '0',
  sets: false,
  showAuthors: true,
}

const filterQuestions = ( questions: Question[], value: DeepPartial<FiltersObject> ): Question[] => {
  const { minDeepness, maxDeepness, tags, randomness, sets } = value
  let filtered = questions
  if ( minDeepness )
    filtered = filtered.filter( e => e.deepness >= Number.parseInt( minDeepness ) )
  if ( maxDeepness )
    filtered = filtered.filter( e => e.deepness <= Number.parseInt( maxDeepness ) )
  if ( tags )
    filtered = filtered.filter( e => filterTags( e, tags ) )
  if ( !sets ) {
    filtered.sort( ( ) => Math.random() - 0.5 )
    if ( randomness )
      filtered.sort( ( a,b ) =>
        Number.parseInt( randomness ) > Math.random() ?
          Math.random() - 0.5 :
          a.deepness - b.deepness + ( Math.random() / 10 - 0.05 )
      )
  }

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
  const { t: t_tags } = useTranslation( 'common', { keyPrefix: 'tags' } )
  const { replace, query, pathname } = useRouter()
  const { register, handleSubmit, watch, reset, getValues, control } = useForm<FiltersObject>( { defaultValues } )

  useEffect( () => {
    const subscription = watch( ( value ) => {
      setQuestions( filterQuestions( allQuestions, value ) )
      if ( value.showAuthors !== undefined ) setShowAuthors( value.showAuthors )
      const diff = updatedDiff( defaultValues, value )
      if ( Object.keys( diff ).length > 0 )
        query[QUERY_INDEX] = qs.stringify( diff, {} )
      else
        delete query[QUERY_INDEX]
      replace( { pathname, query }, { pathname, query }, { scroll: false } )
    } )
    return () => subscription.unsubscribe()
  }, [watch, allQuestions, setQuestions, setShowAuthors, query, replace, pathname] )

  useEffect( () => {
    const fromURL = typeof query[QUERY_INDEX] === 'string' ?
      qs.parse( query[QUERY_INDEX] ,
        {
          decoder: ( str, defaultDecoder, charset, type ) =>
            type === 'value' && ( str === 'true' || str === 'false' ) ?
              str === 'true' :
              defaultDecoder( str )
        }
      ) :
      {}
    if ( Object.keys( updatedDiff( fromURL, getValues() ) ).length > 0 )
      reset( defaultsDeep( fromURL, defaultValues ) )
  } , [reset, query, getValues] )

  return (
    <form onSubmit={handleSubmit( ( ) => { } )}>
      <fieldset>
        <h2 className='mx-auto w-fit'>{t( 'title' )}</h2>
        <ErrorMessage
          text={`${currentQuestions.length} ${t( 'questionsLeft' )}`}
          type={currentQuestions.length === 0 ? 'warn' : 'none'}
        />
      </fieldset>
      <fieldset>
        <FiltersTitle titleText={t( 'tags.title' )} explanation={<Tags/>}/>
        {
          allTags.map( tag =>
            (
              <Controller
                control={control}
                name={`tags.${tag}`}
                key={tag}
                render={( { field:{ value, onChange } } ): JSX.Element => (
                  <TriStateSwitch
                    text={t_tags( tag ) }
                    state={value }
                    setIfUnchanged={false}
                    setState={( newState: TriStateSwitchState ): void => onChange( newState ) }
                  />
                ) }/>
            )
          )
        }
      </fieldset>
      <fieldset>
        <FiltersTitle titleText={t( 'deepness.title' )} explanation={<Deepness/>}/>
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
            <p className='w-max'>{t( 'deepness.maxDeepness' )}</p>
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
      </fieldset>
      <fieldset>
        <FiltersTitle titleText={t( 'order.title' )} explanation={<Order/>}/>
        <label>
          <h4 className='mx-auto w-fit'>{t( 'order.mode.title' )}</h4>
          <Controller
            control={control}
            name='sets'
            render={( { field: { value, onChange } } ): JSX.Element => (
              <EllipsisSwitch
                elements={{ 'false': t( 'order.mode.random' ), 'true': t( 'order.mode.sets' ) }}
                state={value.toString()}
                setState={( state ): void => onChange( state === 'true' ) }/>
            )}
          />
        </label>
        <label className={`w-max mx-auto ${watch( 'sets' ) && 'hidden'}`}>
          <h4 className='mx-auto w-fit'>{t( 'order.randomness.title' )}</h4>
          <div className='flex items-center justify-between'>
            <p className='mr-10'>{t( 'order.randomness.byDeepness' )}</p>
            <p className='ml-auto'>{t( 'order.randomness.random' )}</p>
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
        <FiltersTitle titleText={t( 'authors.title' )} explanation={<Authors/>}/>
        <label className='w-max mx-auto mt-1 w-max'>
          {t( 'authors.showAuthors' )}
          <input
            type='checkbox'
            {...register( 'showAuthors' )}
            className='ml-3'
          />
        </label>
      </fieldset>
    </form>
  )
}
