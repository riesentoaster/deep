import { useTranslation } from 'react-i18next'

export const AuthorExplanation = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.authors' } )

  return (
    <>
      <h2>{t( 'title' )}</h2>
      <p>{t( 'explanation' )}</p>
    </>
  )
}
