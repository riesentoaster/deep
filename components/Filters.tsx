import { useTranslation } from 'next-i18next'
import { Question } from '../public/questions'
import { TriStateSwitch, TriStateSwitchState } from './TriStateSwitch'
import { questions as allQuestions } from '../public/questions'
import { Dropdown } from './Dropdown'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { modes } from '../pages'

const possibleDeepnessLevels = Array( 5 ).fill( 0 ).map( ( _, i ) => i+1 )
const allTags = allQuestions.filter( e => Array.isArray( e.tags ) ).map( e => e.tags as string[] ).flat().filter( ( e,i,a ) => a.indexOf( e ) === i )
const DEFAULT_TAG_STATE: TriStateSwitchState = 'IGNORE'

export const defaultFiltersObject: QuestionFilters = {
  loadedQuery: false,
  tags: allTags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( ( acc, cur ) => Object.assign( acc, cur ), {} ),
  minDeepness: possibleDeepnessLevels[0],
  maxDeepness: possibleDeepnessLevels[possibleDeepnessLevels.length-1],
  mode: 'bestOf3',
  randomness: 0,
  showAuthors: true,
  filterFunction: () => true
}

type QuestionFilter = ( q: Question ) => boolean

interface FiltersProps {
  filters: QuestionFilters
  setFilters: ( f: QuestionFilters ) => void
}
interface QuestionFiltersData {
  tags: Record<string, TriStateSwitchState>;
  minDeepness: number;
  maxDeepness: number;
  loadedQuery: boolean;
  mode: string;
  randomness: number;
  showAuthors: boolean;
}

interface QuestionFilters extends QuestionFiltersData {
  filterFunction: QuestionFilter;
}

const reduceFilters = ( filters: Array<( q: Question ) => boolean> ): ( q: Question ) => boolean =>
  filters.reduce( ( acc, cur ): ( q: Question ) => boolean =>
    ( q ) => acc( q ) && cur( q ) )

const filterIgnoredTags = ( [,v]: string[] ): boolean =>v !== 'IGNORE'

const getFiltersForTags = ( tags: Record<string, TriStateSwitchState> ): Array<( q: Question ) => boolean> =>
  Object.entries( tags )
    .filter( filterIgnoredTags )
    .map( ( [tag, state] ) => getFilterForTag( tag, state ) )

const getFilterForTag = ( tag: string, state: TriStateSwitchState ): QuestionFilter => {
  switch ( state ) {
    case 'IGNORE':
      return () => true
    case 'REQUIRE':
      return ( q ) => !!q.tags?.includes( tag )
    case 'PROHIBIT':
      return ( q ) => !q.tags?.includes( tag )
  }
}

const getNonDefaultFilters = ( state: QuestionFiltersData ): any => {
  const filteredState = {}
  const tags = Object.entries( state.tags ).filter( filterIgnoredTags ).map( ( [k,v] ) => ( { [k]:v } ) ).reduce( ( acc, cur ) => Object.assign( acc, cur ), {} )
  if ( Object.keys( tags ).length > 0 ) Object.assign( filteredState, { tags: tags } )
  if ( state.maxDeepness !== defaultFiltersObject.maxDeepness ) Object.assign( filteredState, { maxDeepness: state.maxDeepness } )
  if ( state.minDeepness !== defaultFiltersObject.minDeepness ) Object.assign( filteredState, { minDeepness: state.minDeepness } )
  if ( state.mode !== defaultFiltersObject.mode ) Object.assign( filteredState, { mode: state.mode } )
  if ( state.randomness !== defaultFiltersObject.randomness ) Object.assign( filteredState, { randomness: state.randomness } )
  if ( state.showAuthors !== defaultFiltersObject.showAuthors ) Object.assign( filteredState, { showAuthors: state.showAuthors } )
  return filteredState
}

export const Filters = ( { filters, setFilters }: FiltersProps ): JSX.Element => {

  const { t } = useTranslation( )

  const router = useRouter()

  const updateFilters = ( state: QuestionFiltersData ): void => {
    const nonDefaultFilters = getNonDefaultFilters( state )
    const query = { ...router.query }
    if ( Object.keys( nonDefaultFilters ).length > 0 ) Object.assign( query, { filters: JSON.stringify( nonDefaultFilters ) } )
    else ( delete query.filters )
    router.replace( { pathname: router.pathname, query: query } )
    const filters: QuestionFilter[] = []
    filters.push( ...getFiltersForTags( state.tags ) )
    filters.push( q => q.deepness >= state.minDeepness )
    filters.push( q => q.deepness <= state.maxDeepness )
    setFilters( {
      ...state,
      filterFunction: reduceFilters( filters )
    } )
  }

  useEffect( () => {
    if ( !router.isReady ) return
    const state = {
      ...defaultFiltersObject,
      loadedQuery: true
    }
    if ( router.query.filters ) {
      const queryFilters = JSON.parse( router.query.filters as string )
      Object.assign( state, {
        ...queryFilters,
        tags:  { ...defaultFiltersObject.tags, ...queryFilters?.tags }
      } )
      const filters: QuestionFilter[] = []
      filters.push( ...getFiltersForTags( state.tags ) )
      filters.push( q => q.deepness >= state.minDeepness )
      filters.push( q => q.deepness <= state.maxDeepness )
      Object.assign( state, { filterFunction: reduceFilters( filters ) } )
    }
    setFilters( state )
  }, [router.isReady, router.query, setFilters] )

  return (
    <Dropdown title='filters' defaultHiddenState={true}>
      <>
        {allTags.map( ( e ) => (
          <TriStateSwitch
            key={e}
            text={e}
            state={filters.tags[e]}
            setState={( newState: TriStateSwitchState ): void => {
              if ( filters.tags[e] !== newState ) updateFilters( { ...filters, tags: { ...filters.tags, [e]: newState } } )
            }}
          /> )
        )}

        <form className={`mx-auto flex flex-row flex-wrap justify-center`}>
          <div className='flex flex-col m-3'>
            <p className='w-max'>{t( 'minDeepness' )}</p>
            <select
              value={filters.minDeepness}
              onChange={( e ): void => {
                const newValue = Number.parseInt( e.target.value )
                if ( newValue !== filters.minDeepness ) updateFilters( { ...filters, minDeepness: newValue } )
              }}
            >
              {possibleDeepnessLevels.map( e => ( <option key={e} disabled={e > filters.maxDeepness}>{e}</option> ) )}
            </select>
          </div>
          <div className='flex flex-col m-3'>
            <p className='w-max'>{t( 'maxDeepness' )}</p>
            <select
              value={filters.maxDeepness}
              onChange={( e ): void => {
                const newValue = Number.parseInt( e.target.value )
                if ( newValue !== filters.maxDeepness ) updateFilters( { ...filters, maxDeepness: newValue } )
              }}
            >
              {possibleDeepnessLevels.map( e => ( <option key={e} disabled={e < filters.minDeepness}>{e}</option> ) )}
            </select>
          </div>
        </form>
        <form className='mx-auto w-max'>
          <p className='w-max mx-auto'>{t( 'mode' )}</p>
          <select
            value={t( filters.mode )}
            onChange={( e ): void => {
              if ( e.target.selectedIndex !== Object.keys( modes ).indexOf( filters.mode ) )
                updateFilters( { ...filters, mode: Object.keys( modes )[e.target.selectedIndex] } )
            }}
          >
            {Object.keys( modes ).map( e => ( <option key={e}>{t( e )}</option> ) )}
          </select>
        </form>
        <form className='mx-auto mt-3 w-max'>
          <p className='w-max mx-auto'>{t( 'order' )}</p>
          <div className='flex items-center justify-between'>
            <p className='mr-10'>{t( 'byDeepness' )}</p>
            <p className='ml-auto'>{t( 'trueRandom' )}</p>
          </div>
          <input
            type="range"
            step="any"
            min="0"
            max="1"
            value={filters.randomness}
            className='h-1 bg-white rounded appearance-none w-full'
            onChange={( e ): void => updateFilters( { ...filters, randomness:  e.target.valueAsNumber } )}
          />
        </form>
        <form className='mx-auto mt-3 w-max'>
          <p className='w-max'>{t( 'showAuthors' )}
            <input
              className='ml-3'
              type="checkbox"
              checked={filters.showAuthors}
              onChange={( e ): void => updateFilters( { ...filters, showAuthors: e.target.checked } )}
            />
          </p>
        </form>
      </>
    </Dropdown>
  )
}
