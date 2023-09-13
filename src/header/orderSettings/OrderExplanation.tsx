import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const OrderExplanation: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.order' } )
  return (
    <>
      <h2>{t( 'title' )}</h2>
      <h3>{t( 'toggleTitle' )}</h3>
      <p>{t( 'mainExplanation' )}</p>
      <h3 className='mt-5'>{t( 'randomness.title' )}</h3>
      <p>{t( 'randomness.explanation' )}</p>
    </>
  )
}
