import { Bars3Icon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Question } from '../public/questions'
import { TriStateSwitch, TriStateSwitchState } from './TriStateSwitch'
import { questions as allQuestions } from '../public/questions'

const possibleDeepnessLevels = Array( 5 ).fill( 0 ).map( ( _, i ) => i+1 )
const tags = allQuestions.map( e => e.tags ).flat().filter( ( e,i,a ) => a.indexOf( e ) === i )
const DEFAULT_TAG_STATE: TriStateSwitchState = 'IGNORE'

type QuestionFilter =( q: Question ) => boolean

interface FiltersProps {
  filters: QuestionFilters
  setFilters: ( f: QuestionFilters ) => void
}

interface QuestionFilters extends QuestionFiltersData {
  filterFunction: QuestionFilter;
}

interface QuestionFiltersData {
tagStates: Record<string, TriStateSwitchState>;
minDeepnessState: number;
maxDeepnessState: number;
}

export const defaultFiltersObject: QuestionFilters = {
  tagStates: tags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( ( acc, cur ) => Object.assign( acc, cur ), {} ),
  minDeepnessState: possibleDeepnessLevels[0],
  maxDeepnessState: possibleDeepnessLevels[possibleDeepnessLevels.length-1],
  filterFunction: () => true
}

export const Filters = ( { filters, setFilters }: FiltersProps ): JSX.Element => {

  const { t } = useTranslation( )

  const updateFilters = ( state: QuestionFiltersData ): void => {
    const filters: QuestionFilter[] = []
    filters.push( ...getFiltersForTags( state.tagStates ) )
    filters.push( q => q.deepness >= state.minDeepnessState )
    filters.push( q => q.deepness <= state.maxDeepnessState )
    setFilters( {
      ...state,
      filterFunction: reduceFilters( filters )
    } )
  }

  const [hidden, setHidden] = useState( false )

  return (
    <div className='mx-auto'>
      <div className='flex flex-row mx-auto w-min justify-center border px-7 rounded-full' onClick={(): void => setHidden( !hidden )}>
        <h2>{t( 'filters' )}</h2>
        <Bars3Icon className='h-8 inline pl-5 my-auto'/>
      </div>
      <div className={`mx-auto w-max ${hidden && 'hidden'}`}>
        {tags.map( ( e ) => (
          <TriStateSwitch
            key={e}
            text={e}
            state={filters.tagStates[e]}
            setState={( newState: TriStateSwitchState ): void => {
              updateFilters( { ...filters, tagStates: { ...filters.tagStates, [e]: newState } } )
            }}
          /> )
        )}
      </div>

      <form className={`mx-auto flex flex-row flex-wrap justify-center ${hidden && 'hidden'}`}>
        <div className='flex flex-col m-3'>
          <p className='w-max'>{t( 'minDeepness' )}</p>
          <select
            defaultValue={filters.minDeepnessState}
            onChange={( e ): void => updateFilters( { ...filters, minDeepnessState: Number.parseInt( e.target.value ) } )}
          >
            {possibleDeepnessLevels.map( e => ( <option key={e} disabled={e > filters.maxDeepnessState}>{e}</option> ) )}
          </select>
        </div>
        <div className='flex flex-col m-3'>
          <p className='w-max'>{t( 'maxDeepness' )}</p>
          <select
            defaultValue={filters.maxDeepnessState}
            onChange={( e ): void => updateFilters( { ...filters, maxDeepnessState: Number.parseInt( e.target.value ) } )}
          >
            {possibleDeepnessLevels.map( e => ( <option key={e} disabled={e < filters.minDeepnessState}>{e}</option> ) )}
          </select>
        </div>
      </form>
    </div>
  )
}

const reduceFilters = ( filters: Array<( q: Question ) => boolean> ): ( q: Question ) => boolean =>
  filters.reduce( ( acc, cur ): ( q: Question ) => boolean =>
    ( q ) => acc( q ) && cur( q ) )

const getFiltersForTags = ( tags: Record<string, TriStateSwitchState> ): Array<( q: Question ) => boolean> =>
  Object.entries( tags )
    .filter( ( e ) => e[1] !== 'IGNORE' )
    .map( ( [tag, state] ) => getFilterForTag( tag, state ) )


const getFilterForTag = ( tag: string, state: TriStateSwitchState ): QuestionFilter => {
  switch ( state ) {
    case 'IGNORE':
      return () => true
    case 'REQUIRE':
      return ( q ) => q.tags?.includes( tag )
    case 'PROHIBIT':
      return ( q ) => !q.tags.includes( tag )
  }
}

