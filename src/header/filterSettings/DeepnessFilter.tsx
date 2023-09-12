import { DeepnessExplanation } from './DeepnessExplanation'
import { useTranslation } from 'react-i18next'
import { maxDeepness, minDeepness } from '../settingsHelpers'
import { Slider } from '../../generic/Slider'
import { WithExplanation } from '../../generic/WithExplanation'

export const DeepnessFilter = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.deepness' } )

  const onChangeMapper = ( value: number | number[] ): {min: number, max: number} => {
    if ( Array.isArray( value ) ) return { min: value[0], max: value[1] }
    else throw new Error( `unexpected value: ${value}` )
  }

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
        onChangeMapper={onChangeMapper}
        textLeft={t( 'min' )}
        textRight={t( 'max' )}
      />
    </>
  )
}
