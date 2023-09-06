import { Dropdown } from '../generic/Dropdown'
import { useTranslation } from 'react-i18next'
import 'rc-slider/assets/index.css'
// import { OrderFilter } from './form-elements/OrderFilter'
// import { AuthorFilter } from './form-elements/AuthorFilter'
import { Menu } from './Menu'
import { FilterSettings } from './filterSettings/Filters'
import styles from './Header.module.scss'
import { DisplaySettings } from './displaySettings/DisplaySettings'
import { OrderSettings } from './orderSettings/OrderSettings'

export const Header = ( ): JSX.Element => {
  const { t } = useTranslation( 'common' )

  return (
    <header className='p-10 border-b'>
      <Dropdown className='w-full' defaultHiddenState={process.env.NODE_ENV === 'production'} title={t( 'deep' )}>
        <div className={`${styles.settings}`}>
          <Menu/>
          <DisplaySettings/>
          <FilterSettings/>
          <OrderSettings/>
        </div>
      </Dropdown>
    </header>
  )
}
