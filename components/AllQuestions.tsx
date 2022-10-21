import { QuestionDisplayProps } from '../pages'
import { Question } from './Question'

export const AllQuestions = ( { questions, showAuthors }: QuestionDisplayProps ): JSX.Element => {
  return (
    <ul className='w-fit mx-auto'>
      {questions.map( e =>
        <li
          className='py-2'
          key={e.index}>
          <Question question={e} showAuthor={showAuthors}/>
        </li>
      )}
    </ul>
  )
}
