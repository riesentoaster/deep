import { useTranslation } from 'react-i18next'
import { Toggle } from '../../generic/Toggle'

export const EnableToggle = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.players' } )
  return (
    <h4 className='flex justify-between mt-2'>
      {t( 'enable' )}
      <Toggle className='my-auto' name={'enable'}/>
    </h4>
  )
}
