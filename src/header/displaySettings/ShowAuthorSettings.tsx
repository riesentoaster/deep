import { useTranslation } from 'react-i18next'
import { WithToggle } from '../../generic/WithToggle'

export const ShowAuthorSettings = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return (
    <WithToggle
      explanation={t( 'showAuthors' )}
      formName={'showAuthors'}
    />
  )
}
