import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const OrderExplanation: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.players.inOrder' } )
  return (
    <>
      <h2>{t( 'title' )}</h2>
      <p>{t( 'explanation' )}</p>
    </>
  )
}
