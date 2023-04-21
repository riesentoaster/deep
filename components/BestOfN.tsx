import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Question } from '../public/questions'
import { Question as QuestionElement } from './Question'

interface BestOfNProps {
    questions: Question[]
    showAuthors: boolean
    n: number
}

function mod( n: number, m: number ): number {
  return ( ( n % m ) + m ) % m
}

const filterQuestions = ( questions: Question[], index: number, n: number ): Question[] => {
  if ( questions.length===0 ) return questions
  const normalizedIndex = mod( index, questions.length )
  const firstNumber = mod( normalizedIndex*n, questions.length )
  const allowedNumbers = Array( n ).fill( 1 ).map( ( _,j ) => mod( firstNumber+j, questions.length ) )
  return allowedNumbers.map( e => questions[e] )
}

export const BestOfN = ( { n, questions, showAuthors }: BestOfNProps ): JSX.Element => {

  const [index, setIndex] = useState( 0 )
  if ( questions.length <= n ) {
    return (
      <ul className='w-fit mx-auto text-center'>
        {questions.map( e =>
          <li
            className='py-2'
            key={e.index}>
            <QuestionElement question={e} showAuthor={showAuthors}/>
          </li>
        )}
      </ul>
    )
  } else {
    return (
      <div className='py-5 flex flex-row'>
        <ChevronLeftIcon className='h-6 w-6 grow shrink-0 my-auto' onClick={(): void => setIndex( index-1 )}/>
        <ul className='w-fit mx-auto text-center'>
          {filterQuestions( questions, index, n ).map( e =>
            <li
              className='py-2'
              key={e.index}>
              <QuestionElement question={e} showAuthor={showAuthors}/>
            </li>
          )}
        </ul>
        <ChevronRightIcon className='h-6 w-6 grow shrink-0 my-auto' onClick={(): void => setIndex( index + 1 )}/>
      </div>
    )
  }
}

