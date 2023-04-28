import { updatedDiff } from 'deep-object-diff'
import { FiltersObject, QUERY_INDEX } from './Filters'
import { TriStateSwitchState } from './TriStateSwitch'
import { Question } from '../../public/questions'
import qs from 'qs'
import { ParsedUrlQuery } from 'querystring'

export const reduceToObject = <R extends Record<string, any>> ( acc: R, cur: R ): R => Object.assign( acc, cur )

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
  if ( deepness ) {
    filtered = filtered.filter( e => deepness.min === undefined || e.deepness >= deepness.min )
    filtered = filtered.filter( e => deepness.max === undefined || e.deepness <= deepness.max )
  }
  if ( tags )
    filtered = filtered.filter( e => filterTags( e, tags ) )
  if ( !sets ) {
    filtered.sort( ( ) => Math.random() - 0.5 )
    if ( randomness )
      filtered.sort( ( a, b ) =>
        randomness > Math.random() ?
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

export const updateQuery = (
  query: ParsedUrlQuery,
  defaultValues: FiltersObject,
  value: DeepPartial<FiltersObject>
): void => {
  const diff = updatedDiff( defaultValues, value )
  if ( Object.keys( diff ).length > 0 )
    query[QUERY_INDEX] = qs.stringify( diff, {} )
  else
    delete query[QUERY_INDEX]
}

export const concretizePathname = ( pathname: string, query: ParsedUrlQuery ): string =>
  pathname.replaceAll( /\[([^[\]]+)\]/g,
    ( everything, group ): string => {
      const extracted = query[group]
      return typeof extracted === 'string' ? extracted : everything
    } )
