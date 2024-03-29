import { useTranslation } from 'react-i18next'
import { Question as QuestionType } from '../questions/questions'
import { FC, useContext } from 'react'
import { DisplaySettingsContext } from '../pages/Layout'

export const nonBreakingSpace = '\u00A0'
interface QuestionProps {
  question: QuestionType
}

export const Question: FC<QuestionProps> = ( { question } ) => {
  const { t } = useTranslation( 'questions' )
  const displaySettings = useContext( DisplaySettingsContext )

  const debugData = import.meta.env.PROD ? undefined :
    [
      `deep:${question.deepness}`,
      question.date,
      `i:${question.index?.toString().padStart( 3, nonBreakingSpace )}`,
      question.tags?.join( ',' + nonBreakingSpace ) || '',
      ''
    ].join( nonBreakingSpace + nonBreakingSpace + nonBreakingSpace )

  return (
    <p className='p-0'>
      {debugData && <span className='text-[0.7em] text-orange-500 font-mono'>{debugData}</span>}
      {t( question.question )}
      {
        displaySettings.showAuthors &&
          question.author &&
          ( <>{nonBreakingSpace}<sup className='pl-1 whitespace-nowrap'>~{question.author}</sup></> )}
    </p>
  )
}
