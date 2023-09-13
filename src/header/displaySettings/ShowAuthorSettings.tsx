import { useTranslation } from 'react-i18next'
import { WithToggle } from '../../generic/WithToggle'
import { FC } from 'react'

export const ShowAuthorSettings: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return (
    <WithToggle
      explanation={t( 'showAuthors' )}
      formName={'showAuthors'}
    />
  )
}
