import { useTranslation } from 'react-i18next'
import { Toggle } from '../../generic/Toggle'

export const RandomToggle = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.order' } )

  return (
    <label className='flex justify-between mt-2'>
      <h4>{t( 'toggleTitle' )}</h4>
      <Toggle name='random' className='my-auto'/>
    </label>
  )
}
