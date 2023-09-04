import { useTranslation } from 'react-i18next'
import { ErrorMessage } from './ErrorMessage'

export const NoQuestionsLeft = (): JSX.Element => {
  const { t } = useTranslation( 'common' )
  return <ErrorMessage text={t( 'noQuestionsLeft' )}/>
}