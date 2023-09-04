import { Controller } from 'react-hook-form'
import { FiltersTitle } from './titles/FiltersTitle'
import { DeepnessExplanation } from './explanations/DeepnessExplanation'
import Slider from 'rc-slider'
import { useTranslation } from 'react-i18next'
import { maxDeepness, minDeepness } from '../Filters'

export const DeepnessFilter = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.deepness' } )

  return ( <fieldset>
    <FiltersTitle titleText={t( 'title' )} explanation={<DeepnessExplanation />} />
    <Controller
      name={'deepness'}
      render={( { field: { value, onChange } } ): JSX.Element => (
        <Slider
          className='mt-1 mb-3'
          range
          min={minDeepness}
          max={maxDeepness}
          step={1}
          marks={{ [minDeepness]: t( 'min' ), [maxDeepness]: t( 'max' ) }}
          allowCross={false}
          value={[value.min, value.max]}
          onChange={
            ( value: number | number[] ): void =>
              onChange( Array.isArray( value ) && { min: value[0], max: value[1] } )
          } />
      )} />
  </fieldset>
  )
}
