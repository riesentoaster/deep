import { useTranslation } from 'next-i18next'
import { QuestionDisplayProps } from '../pages'

export const AllQuestions = ( { questions }: QuestionDisplayProps ): JSX.Element => {
  const { t: t_questions } = useTranslation( 'questions' )

  return (
    <ul className='w-fit mx-auto'>
      {questions.map( e =>
        <li
          className='py-2'
          key={e.index}>
          {t_questions( e.index )}
        </li>
      )}
    </ul>
  )
}
