import { useTranslation } from 'next-i18next'

export const AuthorExplanation = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.authors' } )

  return (
    <>
      <h2>{t( 'title' )}</h2>
      <p>{t( 'explanation' )}</p>
    </>
  )
}
