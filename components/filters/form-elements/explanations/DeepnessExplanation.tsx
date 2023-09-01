import { useTranslation } from 'i18next-ssg'

export const DeepnessExplanation = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.deepness' } )

  return (
    <>
      <h2>{t( 'title' )}</h2>
      <p>{t( 'explanation' )}</p>
    </>
  )
}
