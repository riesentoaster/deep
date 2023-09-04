import { Question as QuestionComponent } from './components/Question'
import { NoQuestionsLeft } from './components/NoQuestionsLeft'
import { useContext } from 'react'
import { CurrentQuestionsContext } from './Layout'

export const Home = ( ): JSX.Element => {
  const questions = useContext( CurrentQuestionsContext )
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
