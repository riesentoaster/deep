import { useFormContext } from 'react-hook-form'
import { WithToggle } from '../../generic/WithToggle'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'

export const AnnounceNextPlayerToggle: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.players' } )
  const { enable } = useFormContext().getValues()
  return enable && <WithToggle className='mt-8' explanation={t( 'announceNextPlayer' )} formName='announceNextPlayer'/>
}
