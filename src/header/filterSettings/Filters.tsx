import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '../../generic/ErrorMessage'
import { DeepnessFilter } from './DeepnessFilter'
import { TagsFilter } from './TagsFilter'
import { defaultFilterSettings } from '../settingsHelpers'
import { useContext } from 'react'
import { ChangeFilterSettingsContext, FilteredAndOrderedQuestionsContext } from '../../pages/Layout'
import { Form } from '../Form'

const QUERY_INDEX_FILTERS = 'filters'

export const FilterSettings = ( ): JSX.Element => {

  const changeFilterSettings = useContext( ChangeFilterSettingsContext )
  const currentQuestions = useContext( FilteredAndOrderedQuestionsContext )

  const { t } = useTranslation( 'common', { keyPrefix: 'header' } )

  return (
    <Form queryIndex={QUERY_INDEX_FILTERS} defaultT={defaultFilterSettings} update={changeFilterSettings }>
      <>
        <h2>{t( 'filters' )}</h2>
        <ErrorMessage
          text={`${currentQuestions.length} ${t( 'questionsLeft' )}`}
          type={currentQuestions.length === 0 ? 'warn' : 'none'}
        />
        <div className='mt-3'><DeepnessFilter/></div>
        <div className='mt-10'><TagsFilter/></div>
      </>
    </Form>
  )
}
