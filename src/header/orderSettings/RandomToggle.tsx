import { Controller } from 'react-hook-form'
import { EllipsisSwitch } from '../../generic/EllipsisSwitch'
import { useTranslation } from 'react-i18next'

export const RandomToggle = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.order.mode' } )

  return (
    <label>
      <h3 className='mx-auto w-fit mt-1'>{t( 'title' )}</h3>
      <Controller
        name='random'
        render={( { field: { value, onChange } } ): JSX.Element => (
          <EllipsisSwitch
            className='my-3'
            elements={{ 'true': t( 'random' ), 'false': t( 'sets' ) }}
            state={value.toString()}
            setState={( state ): void => onChange( state === 'true' )} />
        )} />
    </label>

  )
}
