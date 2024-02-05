import { Question, questions } from './questions'
import seedrandom from 'seedrandom'

const generateDateRange = ( startDate: Date, endDate: Date ): Date[] => {
  const dates: Date[] = []
  for ( let dt = new Date( startDate ); dt <= endDate; dt.setDate( dt.getDate() + 1 ) ) {
    dates.push( new Date( dt ) )
  }
  return dates
}

interface QwS {
  question: Question;
  daysSinceLastQoD: number
}

const daysSinceLastQoD = ( q: Question, qs: Question[] ): number =>
  qs.includes( q ) ? [ ...qs ].reverse().indexOf( q ) : Number.MAX_VALUE

const rng = seedrandom( '42' )
const chooseBasedOnScore = ( acc: QwS, cur: QwS ): QwS =>
  acc.daysSinceLastQoD > cur.daysSinceLastQoD ? acc :
    acc.daysSinceLastQoD < cur.daysSinceLastQoD ? cur :
      rng() - 0.5 > 0 ? acc : cur

const mapEntriesToDateRange = ( entries: Question[] ): Question[] => {
  const today = new Date()
  today.setHours( 0, 0, 0, 0 )
  const minDate = entries.reduce( ( acc, cur ) => acc < new Date( cur.date ) ? acc : new Date( cur.date ), today )
  const dateRange = generateDateRange( new Date( minDate ), today )
  const questionOfTheDay: Question[] = []
  for ( let i = 0; i < dateRange.length; i++ )
    questionOfTheDay.push(
      entries.filter( q => new Date( q.date ) <= dateRange[i] )
        .map( q => ( { daysSinceLastQoD: daysSinceLastQoD( q, questionOfTheDay ), question: q } ) )
        .reduce( chooseBasedOnScore )
        .question
    )

  return questionOfTheDay
}

export const questionsOfDays = mapEntriesToDateRange( questions )
export const questionOfTheDay = questionsOfDays[questionsOfDays.length - 1]
