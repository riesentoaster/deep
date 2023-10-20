import { Dropdown } from '../generic/Dropdown'
import { useTranslation } from 'react-i18next'
import 'rc-slider/assets/index.css'
import { Mode } from './Mode'
import { FilterSettings } from './filterSettings/Filters'
import styles from './Header.module.scss'
import { DisplaySettings } from './displaySettings/DisplaySettings'
import { OrderSettings } from './orderSettings/OrderSettings'
import { PlayerSettings } from './playerSettings/PlayerSettings'
import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const Header: FC = () => {
  const [ hidden, setHidden ] = useState( process.env.NODE_ENV === 'production' )

  const { t } = useTranslation( 'common' )

  const location = useLocation()

  // close menu on nav
  useEffect( () => {
    setHidden( true )
  }, [ location.pathname ] )

  return (
    <header className='p-10 border-b'>
      <Dropdown
        hidden={hidden}
        setHidden={setHidden}
        className='w-full'
        title={t( 'deep' )}
      >
        <div className={`${styles.settings}`}>
          <Mode/>
          <FilterSettings/>
          <OrderSettings/>
          <PlayerSettings/>
          <DisplaySettings/>
        </div>
      </Dropdown>
    </header>
  )
}
