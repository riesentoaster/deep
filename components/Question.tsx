import { useTranslation } from 'i18next-ssg'
import { Question as QuestionType } from '../shared/questions'

const nonBreakingSpace = '\u00A0'
interface QuestionProps {
    question: QuestionType
    showAuthor: boolean
}

export const Question = ( { question, showAuthor }: QuestionProps ): JSX.Element => {
  const { t } = useTranslation( 'questions' )

  const debugData = process.env.NEXT_PUBLIC_DEBUG_QUESTION_PRINT ?
    [
      question.index?.toString().padStart( 3, nonBreakingSpace ),
      question.date,
      question.deepness,
      question.tags || '',
      ''
    ].join( ' ' ) :
    undefined

  return (
    <p className='p-0'>
      {debugData && <span className='text-orange-500'>{debugData}</span>}
      {t( question.question )}
      {
        showAuthor &&
          question.author &&
          ( <>&nbsp;<sup className='pl-1 whitespace-nowrap'>~{question.author}</sup></> )}
    </p>
  )
}
