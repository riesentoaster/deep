import { useFormContext } from 'react-hook-form'
import { Slider } from '../../generic/Slider'
import { useTranslation } from 'react-i18next'
import { WithExplanation } from '../../generic/WithExplanation'
import { OrderExplanation } from './OrderExplanation'

export const OrderSlider = (): JSX.Element => {
  const { enable } = useFormContext().getValues()

  const { t } = useTranslation( 'common', { keyPrefix: 'header.players.inOrder' } )

  return enable && (
    <>
      <WithExplanation
        closedElement={ <h3 className='mx-auto w-fit mt-8'>{t( 'title' )}</h3> }
        explanation={<OrderExplanation/>}
      />
      <Slider
        name='inOrder'
        textLeft={t( 'inOrder' )}
        textRight={t( 'random' )}
        min={0}
        max={1}
        step={0.01}
      />
    </>
  )
}
