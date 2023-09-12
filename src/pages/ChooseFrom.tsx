import { NoQuestionsLeft } from '../generic/NoQuestionsLeft'
import { Question } from '../questions'
import { useContext, useState } from 'react'
import { Question as QuestionElement } from '../generic/Question'
import { ErrorMessage } from '../generic/ErrorMessage'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FilteredAndOrderedQuestionsContext } from './Layout'
import { HorizontalEntry } from '../generic/HorizontalEntry'
import { usePlayers } from '../usePlayers'
import { Ellipsis } from '../generic/Ellipsis'

const mod = ( n: number, m: number ): number => ( ( n % m ) + m ) % m

const filterQuestions = ( questions: Question[], index: number, n: number ): Question[] => {
  if ( questions.length === 0 || questions.length < n ) return questions
  const normalizedIndex = mod( index, questions.length )
  const firstNumber = mod( normalizedIndex * n, questions.length )
  const allowedNumbers = Array( n ).fill( 1 ).map( ( _, j ) => mod( firstNumber + j, questions.length ) )
  return allowedNumbers.map( e => questions[e] )
}

export const ChooseFrom = ( ): JSX.Element => {
  const [index, setIndex] = useState( 0 )
  const { n } = useParams()
  const { t } = useTranslation( 'common' )
  const questions = useContext( FilteredAndOrderedQuestionsContext )
  const { currentPlayer, nextPlayer, shouldDisplay } = usePlayers()

  if ( !n || Array.isArray( n ) ) return <ErrorMessage text={t( 'urlInvalid' )}/>

  const intN = Number.parseInt( n )

  if ( isNaN( intN ) ) return <ErrorMessage text={t( 'urlInvalid' )}/>

  if ( intN === 0 ) return <NoQuestionsLeft/>

  const onMoveToLeft = (): void => setIndex( index - 1 )
  const onMoveToRight = (): void => {
    setIndex( index + 1 )
    nextPlayer()
  }

  return (
    <HorizontalEntry
      leftDisabled={questions.length <= intN || shouldDisplay}
      rightDisabled={questions.length <= intN}
      className='py-5'
      onMoveToLeft={onMoveToLeft}
      onMoveToRight={onMoveToRight}
    >
      <ul className='w-fit mx-auto text-center'>
        {shouldDisplay && <>
          <li>
            {t( 'players.currentPlayer' )}:
            <Ellipsis className='inline ml-5'>{currentPlayer}</Ellipsis>
          </li>
          <hr/>
        </>}
        {filterQuestions( questions, index, intN ).map( e =>
          <li
            className='py-2'
            key={e.index}>
            <QuestionElement question={e}/>
          </li>
        )}
      </ul>
    </HorizontalEntry>
  )
}
