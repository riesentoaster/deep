import { useTranslation } from 'next-i18next'
import { Question as QuestionType } from '../public/questions'

interface QuestionProps {
    question: QuestionType
    showAuthor: boolean
}

export const Question = ( { question, showAuthor }: QuestionProps ): JSX.Element => {
  const { t } = useTranslation( 'questions' )
  console.log( 'q', showAuthor )

  return (
    <p className='p-0'>{t( question.question )}{' '}
      {showAuthor && question.author && ( <sup className='pl-1 whitespace-nowrap'>~{question.author}</sup> )}
    </p>
  )
}
