import { useTranslation } from 'next-i18next'

export const NoQuestionsLeft = (): JSX.Element => {
  const { t } = useTranslation( 'common' )
  return (
    <p>{t( 'noQuestionsLeft' )}</p>
  )
}
