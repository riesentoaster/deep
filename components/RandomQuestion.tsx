import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { QuestionDisplayProps } from '../pages'

export const RandomQuestion = ( { questions }: QuestionDisplayProps ): JSX.Element => {
  const [index, setIndex] = useState( 0 )
  const { t } = useTranslation( 'questions' )
  return (
    <div className='py-5 flex flex-row'>
      <ChevronLeftIcon className='h-6 w-6 grow shrink-0' onClick={(): void => setIndex( ( questions.length + index - 1 ) % questions.length )}/>
      <p>{t( questions[index % questions.length].index )}</p>
      <ChevronRightIcon className='h-6 w-6 grow shrink-0' onClick={(): void => setIndex( index + 1 )}/>
    </div>
  )
}
