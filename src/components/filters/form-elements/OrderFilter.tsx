import { Controller, useWatch } from 'react-hook-form'
import { FiltersTitle } from './titles/FiltersTitle'
import { OrderExplanation } from './explanations/OrderExplanation'
import { EllipsisSwitch } from '../../EllipsisSwitch'
import { useTranslation } from 'react-i18next'
import { Slider } from './Slider'

export const OrderFilter = (): JSX.Element => {
  const randomnessHidden = useWatch( { name: 'sets' } )
  const { t } = useTranslation( 'common', { keyPrefix: 'header.order' } )

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
      <Slider
        name='randomness'
        textLeft={t( 'randomness.byDeepness' )}
        textRight={t( 'randomness.random' )}
        min={0}
        max={1}
        step={0.01}
      />
    </label>}
    </>
  )
}
