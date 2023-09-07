import { Form } from '../Form'
import { useContext } from 'react'
import { ChangeDisplaySettingsContext } from '../../pages/Layout'
import { defaultDisplaySettings } from '../settingsHelpers'
import { ShowAuthorSettings } from './ShowAuthorSettings'
import { useTranslation } from 'react-i18next'
import { WithExplanation } from '../../generic/WithExplanation'
import { DisplayExplanation } from './DisplayExplanation'

const DISPLAY_QUERY_INDEX = 'display'

export const DisplaySettings = (): JSX.Element => {
  const changeDisplaySettings = useContext( ChangeDisplaySettingsContext )
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return (
    <Form queryIndex={DISPLAY_QUERY_INDEX} defaultT={defaultDisplaySettings} update={changeDisplaySettings} >
      <>
        <WithExplanation closedElement={<h2>{t( 'title' )}</h2>} explanation={<DisplayExplanation/>} />
        <ShowAuthorSettings/>
      </>
    </Form>
  )
}
