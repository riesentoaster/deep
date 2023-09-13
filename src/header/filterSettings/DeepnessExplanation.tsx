import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const DeepnessExplanation: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.deepness' } )

  return (
    <>
      <h2>{t( 'title' )}</h2>
      <p>{t( 'explanation' )}</p>
    </>
  )
}
