import { useTranslation } from 'react-i18next'
import { Question as QuestionType } from '../questions'
import { useContext } from 'react'
import { CurrentShowAuthorsContext } from '../Layout'

const nonBreakingSpace = '\u00A0'
interface QuestionProps {
    question: QuestionType
}

export const Question = ( { question }: QuestionProps ): JSX.Element => {
  const { t } = useTranslation( 'questions' )
  const showAuthor = useContext( CurrentShowAuthorsContext )

  const debugData = process.env.REACT_APP_DEBUG_QUESTION_PRINT ?
    [
      `deep:${question.deepness}`,
      question.date,
      `i:${question.index?.toString().padStart( 3, nonBreakingSpace )}`,
      question.tags?.join( ',' + nonBreakingSpace ) || '',
      ''
    ].join( nonBreakingSpace + nonBreakingSpace + nonBreakingSpace ) :
    undefined

  return (
    <p className='p-0'>
      {debugData && <span className='text-[0.7em] text-orange-500 font-mono'>{debugData}</span>}
      {t( question.question )}
      {
        showAuthor &&
          question.author &&
          ( <>&nbsp;<sup className='pl-1 whitespace-nowrap'>~{question.author}</sup></> )}
    </p>
  )
}