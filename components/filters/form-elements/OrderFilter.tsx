import { Controller, useWatch } from 'react-hook-form'
import { FiltersTitle } from '../FiltersTitle'
import { Order } from '../explanations/Order'
import { EllipsisSwitch } from '../../EllipsisSwitch'
import Slider from 'rc-slider'
import { useTranslation } from 'next-i18next'

export const OrderFilter = (): JSX.Element => {
  const randomnessHidden = useWatch( { name: 'sets' } )
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.order' } )

  return (
    <fieldset>
      <FiltersTitle titleText={t( 'title' )} explanation={<Order />} />
      <label>
        <h4 className='mx-auto w-fit'>{t( 'mode.title' )}</h4>
        <Controller
          name='sets'
          render={( { field: { value, onChange } } ): JSX.Element => (
            <EllipsisSwitch
              className='my-3'
              elements={{ 'false': t( 'mode.random' ), 'true': t( 'mode.sets' ) }}
              state={value.toString()}
              setState={( state ): void => onChange( state === 'true' )} />
          )} />
      </label>
      {!randomnessHidden &&
    <label>
      <h4 className='mx-auto w-fit'>{t( 'randomness.title' )}</h4>
      <div className='flex items-center justify-between'>
        <p className='mr-10'>{t( 'randomness.byDeepness' )}</p>
        <p className='ml-auto'>{t( 'randomness.random' )}</p>
      </div>
      <Controller
        name='randomness'
        render={( { field: { value, onChange } } ): JSX.Element => (
          <Slider
            className='my-1'
            min={0}
            max={1}
            step={0.01}
            value={value}
            onChange={onChange} />
        )} />
    </label>}
    </fieldset>
  )
}
