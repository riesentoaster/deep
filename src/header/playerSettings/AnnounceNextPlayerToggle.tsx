import { useFormContext } from 'react-hook-form'
import { WithToggle } from '../../generic/WithToggle'
import { useTranslation } from 'react-i18next'

export const AnnounceNextPlayerToggle = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.players' } )
  const { enable } = useFormContext().getValues()
  return enable && <WithToggle explanation={t( 'announceNextPlayer' )} formName='announceNextPlayer'/>
}
