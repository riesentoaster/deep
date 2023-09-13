import { TriStateSwitchState } from '../generic/TriStateSwitch'
import { reduceToObject, unique } from '../helpers'
import { questions as allQuestions } from '../questions'

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export interface FilterSettings {
  deepness: {min: number, max: number}
  tags: {[tag: string]: TriStateSwitchState}
}

const DEFAULT_TAG_STATE: TriStateSwitchState = 'IGNORE'
const possibleDeepnessLevels = allQuestions.map( e => e.deepness ).filter( unique ).sort()
export const minDeepness = Math.min( ...possibleDeepnessLevels )
export const maxDeepness = Math.max( ...possibleDeepnessLevels )
export const allTags = allQuestions
  .filter( e => Array.isArray( e.tags ) )
  .flatMap( e => e.tags as string[] )
  .filter( unique )

export const defaultFilterSettings: FilterSettings = {
  deepness: { min: minDeepness, max: maxDeepness },
  tags: allTags.map( e => ( { [e]: DEFAULT_TAG_STATE } ) ).reduce( reduceToObject, {} ),
}

export interface OrderSettings {
  random: boolean
  byDeepness: number // 0: by deepness, 1: random
}

export const defaultOrderSettings: OrderSettings = {
  random: true,
  byDeepness: 0
}

export interface PlayerSettings {
  enable: boolean
  announceNextPlayer: boolean
  players: string[]
}

export const defaultPlayerSettings: PlayerSettings = {
  enable: false,
  announceNextPlayer: false,
  players: []
}

export interface PlayerCounts {
  [name: string]: number
}

export interface DisplaySettings {
  showAuthors: boolean
}

export const defaultDisplaySettings: DisplaySettings = {
  showAuthors: true
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
