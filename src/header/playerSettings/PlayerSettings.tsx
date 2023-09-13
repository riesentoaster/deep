import { FC, useContext } from 'react'
import { ChangePlayerSettingsContext } from '../../pages/Layout'
import { Form } from '../Form'
import { defaultPlayerSettings } from '../settingsHelpers'
import { useTranslation } from 'react-i18next'
import { PlayerNameSettings } from './PlayerNameSettings'
import { WithToggle } from '../../generic/WithToggle'
import { AnnounceNextPlayerToggle } from './AnnounceNextPlayerToggle'
import { OrderSlider } from './OrderSlider'

const PLAYER_QUERY_INDEX = 'players'
export const PlayerSettings: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.players' } )
  const changePlayerSettings = useContext( ChangePlayerSettingsContext )

  return (
    <Form queryIndex={PLAYER_QUERY_INDEX} defaultValue={defaultPlayerSettings} update={changePlayerSettings}>
      <>
        <h2>{t( 'title' )}</h2>
        <WithToggle explanation={t( 'enable' )} formName='enable'/>
        <OrderSlider/>
        <AnnounceNextPlayerToggle/>
        <PlayerNameSettings/>
      </>
    </Form>
  )
}
