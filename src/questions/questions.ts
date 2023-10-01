import { unique } from '../helpers'
import { DEFAULT_LANGUAGE } from './language'
import { questionsByDate } from './questionsByDate'
import { Tag } from './tags'

export interface Question {
  question: string
  index: number
  deepness: number
  date: string
  tags?: Tag[]
  author?: string
}

export const questions: Question[] = Object.entries( questionsByDate )
  .sort( ( a, b ) => ( a[0] <= b[0] ? -1 : 1 ) )
  .flatMap( ( [ date, questionsInDate ], iDate, arr ) => {
    const p = arr.slice( 0, iDate ).map( e => e[1].length ).reduce( ( acc, cur ) => acc + cur, 0 )
    return questionsInDate.map( ( q, iQ ) => {
      const questionsObject: Question = {
        question: q.translations[DEFAULT_LANGUAGE],
        index: iQ + p,
        deepness: q.deepness,
        date: date,
        tags: q.tags,
        author: q.author
      }
      if ( q.author ) {
        if ( questionsObject.tags ) questionsObject.tags.push( 'hasAuthor' )
        else questionsObject.tags = [ 'hasAuthor' ]
      }
      return questionsObject
    }
    )
  } )
  .sort( ( a, b ) => b.index - a.index )

const possibleDeepnessLevels = questions.map( e => e.deepness ).filter( unique ).sort()

export const minDeepness = Math.min( ...possibleDeepnessLevels )
export const maxDeepness = Math.max( ...possibleDeepnessLevels )

export const allTags = questions.flatMap( e => e.tags || [] ).filter( unique )
