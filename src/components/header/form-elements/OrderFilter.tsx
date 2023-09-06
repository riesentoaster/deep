import { Controller, useWatch } from 'react-hook-form'
import { TitleWithExplanation } from './titles/TitleWithExplanation'
import { OrderExplanation } from './explanations/OrderExplanation'
import { EllipsisSwitch } from '../../shared/EllipsisSwitch'
import { useTranslation } from 'react-i18next'
import { Slider } from './Slider'

export const OrderFilter = (): JSX.Element => {
  const randomnessHidden = useWatch( { name: 'sets' } )
  const { t } = useTranslation( 'common', { keyPrefix: 'header.order' } )

  return (
    <>
      <TitleWithExplanation titleText={t( 'title' )} explanation={<OrderExplanation />} />
      <label>
        <h3 className='mx-auto w-fit mt-1'>{t( 'mode.title' )}</h3>
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
      <h3 className='mx-auto w-fit mt-8'>{t( 'randomness.title' )}</h3>
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
