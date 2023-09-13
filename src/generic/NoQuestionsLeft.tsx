import { useTranslation } from 'react-i18next'
import { ErrorMessage } from './ErrorMessage'
import { FC } from 'react'

export const NoQuestionsLeft: FC = () => {
  const { t } = useTranslation( 'common' )
  return <ErrorMessage text={t( 'noQuestionsLeft' )}/>
}
