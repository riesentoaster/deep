import { Controller } from 'react-hook-form'
import { FiltersTitle } from './titles/FiltersTitle'
import { DeepnessExplanation } from './explanations/DeepnessExplanation'
import Slider from 'rc-slider'
import { useTranslation } from 'next-i18next'

export const DeepnessFilter = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.deepness' } )

  return( <fieldset>
    <FiltersTitle titleText={t( 'title' )} explanation={<DeepnessExplanation />} />
    <Controller
      name={'deepness'}
      render={( { field: { value, onChange } } ): JSX.Element => (
        <Slider
          className='my-1'
          range
          min={1}
          max={5}
          step={1}
          allowCross={false}
          value={[value.min, value.max]}
          onChange={( value: number | number[] ): void => onChange( Array.isArray( value ) && { min: value[0], max: value[1] } )} />
      )} />
  </fieldset>
  )
}
