import { useTranslation } from 'i18next-ssg'
import { ErrorMessage } from './ErrorMessage'

export const NoQuestionsLeft = (): JSX.Element => {
  const { t } = useTranslation( 'common' )
  return <ErrorMessage text={t( 'noQuestionsLeft' )}/>
}
