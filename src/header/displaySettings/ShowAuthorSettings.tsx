import { useTranslation } from 'react-i18next'
import { Toggle } from '../../generic/Toggle'

export const ShowAuthorSettings = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.display' } )

  return (
    <label className='flex justify-between mt-2'>
      <h4>{t( 'showAuthors' )}</h4>
      <Toggle name='showAuthors' className='my-auto'/>
    </label>
  )
}
