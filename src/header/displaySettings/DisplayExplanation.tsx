import { useTranslation } from 'react-i18next'

export const DisplayExplanation = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return (
    <>
      <h2>{t( 'title' )}</h2>
      <h3>{t( 'showAuthors' )}</h3>
      <p>{t( 'explanation' )}</p>
    </>
  )
}
