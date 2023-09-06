import { useTranslation } from 'react-i18next'

export const AuthorExplanation = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return (
    <>
      <h2>{t( 'authors' )}</h2>
      <p>{t( 'explanation' )}</p>
    </>
  )
}
