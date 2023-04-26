import { useTranslation } from 'next-i18next'
import { EllipsisSwitch } from '../../EllipsisSwitch'
import { useState } from 'react'

export const Order = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'filters.order' } )
  const [modeState, setModeState] = useState( false )
  return (
    <>
      <h2>{t( 'title' )}</h2>
      <h3>{t( 'mode.title' )}</h3>
      <EllipsisSwitch
        elements={{ false: t( 'mode.random' ), true: t( 'mode.sets' ) }}
        state={( modeState ).toString()}
        setState={( state ): void => setModeState( state === 'true' ) }/>
      <p>{t( modeState ? 'mode.explanation-random' : 'mode.explanation-sets' )}</p>
      <h3 className='mt-5'>{t( 'randomness.title' )}</h3>
      <p>{t( 'randomness.explanation' )}</p>
    </>
  )
}
