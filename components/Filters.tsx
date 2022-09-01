import { useTranslation } from 'next-i18next'
import { Question } from '../public/questions'
import { TriStateSwitch, TriStateSwitchState } from './TriStateSwitch'
import { questions as allQuestions } from '../public/questions'
import { Dropdown } from './Dropdown'

const possibleDeepnessLevels = Array( 5 ).fill( 0 ).map( ( _, i ) => i+1 )
const allTags = allQuestions.map( e => e.tags ).flat().filter( ( e,i,a ) => a.indexOf( e ) === i )
const DEFAULT_TAG_STATE: TriStateSwitchState = 'IGNORE'
// const QUERY_TAG_FILTER_PREFIX = 'tag_'

type QuestionFilter = ( q: Question ) => boolean

interface FiltersProps {
  filters: QuestionFilters
  setFilters: ( f: QuestionFilters ) => void
}

interface QuestionFilters extends QuestionFiltersData {
  filterFunction: QuestionFilter;
}

interface QuestionFiltersData {
  tags: Record<string, TriStateSwitchState>;
  minDeepness: number;
  maxDeepness: number;
}

export const defaultFiltersObject: QuestionFilters = {
  tags: allTags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( ( acc, cur ) => Object.assign( acc, cur ), {} ),
  minDeepness: possibleDeepnessLevels[0],
  maxDeepness: possibleDeepnessLevels[possibleDeepnessLevels.length-1],
  filterFunction: () => true
}

export const Filters = ( { filters, setFilters }: FiltersProps ): JSX.Element => {

  const { t } = useTranslation( )

  const updateFilters = ( state: QuestionFiltersData ): void => {
    const filters: QuestionFilter[] = []
    filters.push( ...getFiltersForTags( state.tags ) )
    filters.push( q => q.deepness >= state.minDeepness )
    filters.push( q => q.deepness <= state.maxDeepness )
    setFilters( {
      ...state,
      filterFunction: reduceFilters( filters )
    } )
  }



  return (
    <Dropdown title='filters'>
      <>
        {allTags.map( ( e ) => (
          <TriStateSwitch
            key={e}
            text={e}
            state={filters.tags[e]}
            setState={( newState: TriStateSwitchState ): void => {
              if ( filters.tags[e] !== newState ) {
                updateFilters( { ...filters, tags: { ...filters.tags, [e]: newState } } )
              }
            }}
          /> )
        )}

        <form className={`mx-auto flex flex-row flex-wrap justify-center`}>
          <div className='flex flex-col m-3'>
            <p className='w-max'>{t( 'minDeepness' )}</p>
            <select
              value={filters.minDeepness}
              onChange={( e ): void => updateFilters( { ...filters, minDeepness: Number.parseInt( e.target.value ) } )}
            >
              {possibleDeepnessLevels.map( e => ( <option key={e} disabled={e > filters.maxDeepness}>{e}</option> ) )}
            </select>
          </div>
          <div className='flex flex-col m-3'>
            <p className='w-max'>{t( 'maxDeepness' )}</p>
            <select
              value={filters.maxDeepness}
              onChange={( e ): void => updateFilters( { ...filters, maxDeepness: Number.parseInt( e.target.value ) } )}
            >
              {possibleDeepnessLevels.map( e => ( <option key={e} disabled={e < filters.minDeepness}>{e}</option> ) )}
            </select>
          </div>
        </form>
      </>
    </Dropdown>
  )
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
      return ( q ) => q.tags?.includes( tag )
    case 'PROHIBIT':
      return ( q ) => !q.tags.includes( tag )
  }
}

