import { OrderExplanation } from './OrderExplanation'
import { useTranslation } from 'react-i18next'
import { Form } from '../Form'
import { useContext } from 'react'
import { ChangeOrderSettingsContext } from '../../pages/Layout'
import { defaultOrderSettings } from '../settingsHelpers'
import { RandomToggle } from './RandomToggle'
import { RandomnessSlider } from './RandomnessSlider'
import { WithExplanation } from '../../generic/WithExplanation'

const ORDER_QUERY_INDEX = 'order'

export const OrderSettings = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.order' } )
  const changeOrderSettings = useContext( ChangeOrderSettingsContext )

  return (
    <Form queryIndex={ORDER_QUERY_INDEX} defaultValue={defaultOrderSettings} update={changeOrderSettings}>
      <>
        <WithExplanation closedElement={<h2>{t( 'title' )}</h2>} explanation={<OrderExplanation />} />
        <RandomToggle/>
        <RandomnessSlider/>
      </>
    </Form>
  )
}
