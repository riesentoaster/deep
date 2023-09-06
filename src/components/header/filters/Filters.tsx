import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '../../shared/ErrorMessage'
import { DeepnessFilter } from '../form-elements/DeepnessFilter'
import { TagsFilter } from '../form-elements/TagsFilter'
import { Question } from '../../../questions'

interface FilterProps {
    currentQuestions: Question[]
}

export const Filters = ( { currentQuestions }: FilterProps ): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header' } )
  return (
    <>
      <h2>{t( 'filters' )}</h2>
      <ErrorMessage
        text={`${currentQuestions.length} ${t( 'questionsLeft' )}`}
        type={currentQuestions.length === 0 ? 'warn' : 'none'}
      />
      <div className='mt-3'><DeepnessFilter/></div>
      <div className='mt-10'><TagsFilter/></div>
    </>
  )
}
