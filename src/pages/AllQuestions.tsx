import { Question as QuestionComponent } from '../generic/Question'
import { NoQuestionsLeft } from './NoQuestionsLeft'
import { useContext } from 'react'
import { FilteredAndOrderedQuestionsContext } from './Layout'

export const AllQuestions = ( ): JSX.Element => {
  const questions = useContext( FilteredAndOrderedQuestionsContext )
  if ( questions.length === 0 )
    return ( <NoQuestionsLeft/> )
  else
    return (
      <ul className='w-fit mx-auto'>
        {questions.map( e =>
          <li
            className='py-2'
            key={e.index}>
            <QuestionComponent question={e}/>
          </li>
        )}
      </ul> )
}
