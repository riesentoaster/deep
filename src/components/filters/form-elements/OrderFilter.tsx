import { Controller, useWatch } from 'react-hook-form'
import { FiltersTitle } from './titles/FiltersTitle'
import { OrderExplanation } from './explanations/OrderExplanation'
import { EllipsisSwitch } from '../../EllipsisSwitch'
import Slider from 'rc-slider'
import { useTranslation } from 'react-i18next'

export const OrderFilter = (): JSX.Element => {
  const randomnessHidden = useWatch( { name: 'sets' } )
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.order' } )

  return (
    <>
      <FiltersTitle titleText={t( 'title' )} explanation={<OrderExplanation />} />
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
      <Controller
        name='randomness'
        render={( { field: { value, onChange } } ): JSX.Element => (
          <div className='mt-1 mb-3 mx-10'>
            <Slider
              min={0}
              max={1}
              step={0.01}
              marks={{ 0: t( 'randomness.byDeepness' ), 1: t( 'randomness.random' ) }}
              value={value}
              onChange={onChange} />
          </div>
        )} />
    </label>}
    </>
  )
}
