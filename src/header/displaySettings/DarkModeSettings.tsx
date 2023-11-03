import { useTranslation } from 'react-i18next'
import { WithToggle } from '../../generic/WithToggle'
import { FC } from 'react'

export const DarkModeSettings: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return (
    <WithToggle
      explanation={t( 'darkMode' )}
      formName={'mode'}
    />
  )
}
