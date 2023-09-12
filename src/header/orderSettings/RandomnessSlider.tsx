import { useWatch } from 'react-hook-form'
import { Slider } from '../../generic/Slider'
import { useTranslation } from 'react-i18next'

export const RandomnessSlider = (): JSX.Element => {
  const showRandomness = useWatch( { name: 'random' } )
  const { t } = useTranslation( 'common', { keyPrefix: 'header.order' } )

  return showRandomness && (
    <label>
      <h3 className='mx-auto w-fit mt-4'>{t( 'randomness.title' )}</h3>
      <Slider
        name='byDeepness'
        textLeft={t( 'randomness.byDeepness' )}
        textRight={t( 'randomness.random' )}
        min={0}
        max={1}
        step={0.01}
      />
    </label>
  )
}
