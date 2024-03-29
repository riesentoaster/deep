import { TriStateSwitchState } from '../generic/TriStateSwitch'
import { allTags, maxDeepness, minDeepness } from '../questions/questions'
import { Tag } from '../questions/tags'

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export interface FilterSettings {
  deepness: {min: number, max: number}
  tags: Record<Tag, TriStateSwitchState>
}

export const defaultFilterSettings: FilterSettings = {
  deepness: { min: minDeepness, max: maxDeepness },
  tags: Object.fromEntries( allTags.map( e => [ e, 'IGNORE' ] ) ) as Record<Tag, TriStateSwitchState>
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
  inOrder: number
  announceNextPlayer: boolean
  players: string[]
}

export const defaultPlayerSettings: PlayerSettings = {
  enable: false,
  inOrder: 0,
  announceNextPlayer: false,
  players: []
}

export interface PlayerCounts {
  [name: string]: number
}

export interface DisplaySettings {
  showAuthors: boolean
  mode: boolean
}

export const defaultDisplaySettings: DisplaySettings = {
  showAuthors: true,
  mode: !window.matchMedia( '(prefers-color-scheme: light)' ).matches
}

