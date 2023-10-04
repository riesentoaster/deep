import { Form } from '../Form'
import { FC, useContext } from 'react'
import { ChangeDisplaySettingsContext } from '../../pages/Layout'
import { defaultDisplaySettings } from '../settingsHelpers'
import { ShowAuthorSettings } from './ShowAuthorSettings'
import { useTranslation } from 'react-i18next'
import { LanguageSettings } from './LanguageSettings'

const DISPLAY_QUERY_INDEX = 'display'

export const DisplaySettings: FC = () => {
  const changeDisplaySettings = useContext( ChangeDisplaySettingsContext )
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return (
    <Form queryIndex={DISPLAY_QUERY_INDEX} defaultValue={defaultDisplaySettings} update={changeDisplaySettings} >
      <>
        <h2>{t( 'title' )}</h2>
        <ShowAuthorSettings/>
        <LanguageSettings className='mt-4'/>
      </>
    </Form>
  )
}
