import { NoQuestionsLeft } from './components/NoQuestionsLeft'
import { Question } from './questions'
import { useContext, useState } from 'react'
import { Question as QuestionElement } from './components/Question'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ErrorMessage } from './components/shared/ErrorMessage'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CurrentQuestionsContext } from './Layout'

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
  const questions = useContext( CurrentQuestionsContext )

  if ( !n || Array.isArray( n ) ) return <ErrorMessage text={t( 'urlInvalid' )}/>

  const intN = Number.parseInt( n )

  if ( isNaN( intN ) ) return <ErrorMessage text={t( 'urlInvalid' )}/>

  if ( intN === 0 ) return <NoQuestionsLeft/>

  return (
    <div className='py-5 flex flex-row'>
      {
        questions.length > intN &&
          <ChevronLeftIcon className='h-6 w-6 grow shrink-0 my-auto' onClick={(): void => setIndex( index - 1 )}/>
      }
      <ul className='w-fit mx-auto text-center'>
        {filterQuestions( questions, index, intN ).map( e =>
          <li
            className='py-2'
            key={e.index}>
            <QuestionElement question={e}/>
          </li>
        )}
      </ul>
      {
        questions.length > intN &&
          <ChevronRightIcon className='h-6 w-6 grow shrink-0 my-auto' onClick={(): void => setIndex( index + 1 )}/>
      }
    </div>
  )
}
