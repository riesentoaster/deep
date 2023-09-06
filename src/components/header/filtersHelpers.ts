import { TriStateSwitchState } from './TriStateSwitch'
import { Question } from '../../questions'
import qs from 'qs'
import { ParsedUrlQuery } from 'querystring'

import { reduceToObject, unique } from '../../helpers'
import { questions as allQuestions } from '../../questions'

const DEFAULT_TAG_STATE: TriStateSwitchState = 'IGNORE'
const possibleDeepnessLevels = allQuestions.map( e => e.deepness ).filter( unique ).sort()
export const minDeepness = Math.min( ...possibleDeepnessLevels )
export const maxDeepness = Math.max( ...possibleDeepnessLevels )
export const allTags = allQuestions
  .filter( e => Array.isArray( e.tags ) )
  .map( e => e.tags as string[] )
  .flat()
  .filter( unique )
export const QUERY_INDEX = 'filters'

export interface FiltersProps {
  currentQuestions: Question[]
  setQuestions( q: Question[] ): void
  setShowAuthors( showAuthor: boolean ): void
}

export interface FiltersObject {
  tags: Record<string, TriStateSwitchState>
  deepness: {min: number, max: number}
  randomness: number
  sets: boolean
  showAuthors: boolean
}

export const defaultValues: FiltersObject = {
  tags: allTags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( reduceToObject, {} ),
  deepness: { min: minDeepness, max: maxDeepness },
  randomness: 0,
  sets: false,
  showAuthors: true,
}

const random: ( ) => number = () => Math.random() - 0.5

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
  }

export const decodeBooleanAndNumbers: qs.IParseOptions['decoder'] = ( str, defaultDecoder, charset, type ) => {
  if ( type === 'value' ) {
    if ( str === 'true' || str === 'false' )
      return str === 'true'
    else if ( /^[\d-]+$/.test( str ) )
      return Number.parseInt( str )
    else if ( /^[\d.-]+$/.test( str ) )
      return Number.parseFloat( str )
  }
  return defaultDecoder( str )
}

export const filterQuestions = ( questions: Question[], value: DeepPartial<FiltersObject> ): Question[] => {
  const { deepness, tags, randomness, sets } = value
  let filtered = questions
  if ( deepness !== undefined ) {
    filtered = filtered.filter( e => deepness.min === undefined || e.deepness >= deepness.min )
    filtered = filtered.filter( e => deepness.max === undefined || e.deepness <= deepness.max )
  }
  if ( tags !== undefined )
    filtered = filtered.filter( e => filterTags( e, tags ) )
  if ( !sets ) {
    filtered.sort( random )
    if ( randomness !== undefined )
      filtered.sort( ( a, b ) =>
        randomness > Math.random() ?
          random() :
          a.deepness - b.deepness + ( Math.random() / 10 - 0.05 )
      )
  }
  return filtered
}

const filterTags = ( q: Question, tags: Record<string, TriStateSwitchState|undefined> ): boolean => {
  const requiredTags = Object.entries( tags ).filter( e => e[1] === 'REQUIRE' ).map( e => e[0] )
  const prohibitedTags = Object.entries( tags ).filter( e => e[1] === 'PROHIBIT' ).map( e => e[0] )
  const hasAllRequiredTags = requiredTags.every( tag => q.tags?.includes( tag ) )
  const containsProhibitedTag = prohibitedTags.some( tag => q.tags?.includes( tag ) )
  return hasAllRequiredTags && !containsProhibitedTag
}

export const concretizePathname = ( pathname: string, query: ParsedUrlQuery ): string =>
  pathname.replaceAll( /\[([^[\]]+)\]/g,
    ( everything, group ): string => {
      const extracted = query[group]
      return typeof extracted === 'string' ? extracted : everything
    } )
