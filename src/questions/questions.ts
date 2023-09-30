import { unique } from '../helpers'
import { questionsByDate } from './questionsByDate'
import { Language, Question, Tag } from './types'

export const tagTranslations: Record<Language, Record<Tag, String>> = {
  de: {
    'christians': 'Für Christen',
    'twoPeople': 'Für 2 Personen',
    'philosophy': 'Philosophie',
    'sex': 'Sexualität',
    'hasAuthor': 'Hat Autor:in',
    'dating': 'Für Paare',
    'v': 'Valentins Favoriten'
  },
  en: {
    'christians': 'For Christians',
    'twoPeople': 'For 2 People',
    'philosophy': 'Philosophy',
    'sex': 'Sexuality',
    'hasAuthor': 'Has Author',
    'dating': 'For Couples',
    'v': 'Valentin\'s Favourites'
  }
}

const DEFAULT_LANG = 'en'
const extractedTranslations = Object.values( questionsByDate ).flat().map( e => e.translations )
export const questionTranslations = {
  en: Object.fromEntries( extractedTranslations.map( e => ( [ e[DEFAULT_LANG], e.en ] ) ) ),
  de: Object.fromEntries( extractedTranslations.map( e => ( [ e[DEFAULT_LANG], e.de ] ) ) ),
}

export const questions: Question[] = Object.entries( questionsByDate )
  .sort( ( a, b ) => ( a[0] <= b[0] ? -1 : 1 ) )
  .flatMap( ( [ date, questionsInDate ], iDate, arr ) => {
    const p = arr.slice( 0, iDate ).map( e => e[1].length ).reduce( ( acc, cur ) => acc + cur, 0 )
    return questionsInDate.map( ( q, iQ ) => {
      const questionsObject: Question = {
        question: q.translations[DEFAULT_LANG],
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
