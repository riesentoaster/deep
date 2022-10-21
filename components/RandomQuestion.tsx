import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { QuestionDisplayProps } from '../pages'
import { Question } from './Question'

export const RandomQuestion = ( { questions, showAuthors }: QuestionDisplayProps ): JSX.Element => {
  const [index, setIndex] = useState( 0 )

  return (
    <div className='py-5 flex flex-row'>
      <ChevronLeftIcon className='h-6 w-6 grow shrink-0' onClick={(): void => setIndex( ( questions.length + index - 1 ) % questions.length )}/>
      {questions[index % questions.length] && ( <Question question={questions[index % questions.length]} showAuthor={showAuthors}/> )}
      <ChevronRightIcon className='h-6 w-6 grow shrink-0' onClick={(): void => setIndex( index + 1 )}/>
    </div>
  )
}
