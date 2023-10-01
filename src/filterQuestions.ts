import { DeepPartial } from 'react-hook-form'
import { FilterSettings } from './header/settingsHelpers'
import { Question } from './questions/questions'
import { TriStateSwitchState } from './generic/TriStateSwitch'
import { Tag } from './questions/tags'

const filterTags = (
  q: Question,
  tags: DeepPartial<{[tagName: string]: TriStateSwitchState}>
): boolean => {
  const requiredTags = Object.entries( tags ).filter( e => e[1] === 'REQUIRE' ).map( e => e[0] )
  const prohibitedTags = Object.entries( tags ).filter( e => e[1] === 'PROHIBIT' ).map( e => e[0] )
  const hasAllRequiredTags = requiredTags.every( tag => q.tags?.includes( tag as Tag ) )
  const containsProhibitedTag = prohibitedTags.some( tag => q.tags?.includes( tag as Tag ) )
  return hasAllRequiredTags && !containsProhibitedTag
}

export const filter = ( filters: DeepPartial<FilterSettings>, questions: Question[] ): Question[] => {
  let filtered = questions
  if ( filters.deepness !== undefined ) {
    filtered = filtered.filter( e => filters.deepness?.min === undefined || e.deepness >= filters.deepness.min )
    filtered = filtered.filter( e => filters.deepness?.max === undefined || e.deepness <= filters.deepness.max )
  }
  if ( filters.tags !== undefined )
    filtered = filtered.filter( e =>
      filterTags( e, filters.tags as DeepPartial<{[tagName: string]: TriStateSwitchState}> ) )
  return filtered
}
