import { useTranslation } from 'react-i18next'
import { EllipsisSwitch } from '../../generic/EllipsisSwitch'
import { useState } from 'react'

export const OrderExplanation = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.order' } )
  const [modeState, setModeState] = useState( false )
  return (
    <>
      <h2>{t( 'title' )}</h2>
      <h3>{t( 'mode.title' )}</h3>
      <EllipsisSwitch
        className='my-3'
        elements={{ false: t( 'mode.random' ), true: t( 'mode.sets' ) }}
        state={( modeState ).toString()}
        setState={( state ): void => setModeState( state === 'true' ) }/>
      <p>{t( modeState ? 'mode.explanation-sets' : 'mode.explanation-random' )}</p>
      <h3 className='mt-5'>{t( 'randomness.title' )}</h3>
      <p>{t( 'randomness.explanation' )}</p>
    </>
  )
}
