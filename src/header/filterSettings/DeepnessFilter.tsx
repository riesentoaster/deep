import { DeepnessExplanation } from './DeepnessExplanation'
import { useTranslation } from 'react-i18next'
import { maxDeepness, minDeepness } from '../settingsHelpers'
import { Slider } from '../../generic/Slider'
import { WithExplanation } from '../../generic/WithExplanation'

export const DeepnessFilter = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.deepness' } )

  return (
    <>
      <WithExplanation closedElement={<h3>{t( 'title' )}</h3>} explanation={<DeepnessExplanation />} />
      <Slider
        name={'deepness'}
        range
        dots
        min={minDeepness}
        max={maxDeepness}
        step={1}
        valueMapper={( value ): number[] => [value.min, value.max]}
        onChangeMapper={( value: number | number[] ): any =>
          Array.isArray( value ) && { min: value[0], max: value[1] } }
        textLeft={t( 'min' )}
        textRight={t( 'max' )}
      />
    </>
  )
}
