import { FC } from 'react'
import styles from './TriStateSwitch.module.scss'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'

export type TriStateSwitchState = 'REQUIRE' | 'IGNORE' | 'PROHIBIT';

interface TriStateSwitchProps {
  displayText: string
  inputAttrs?: ( value: TriStateSwitchState ) =>
  React.InputHTMLAttributes<HTMLInputElement> &
  {ref?: React.Ref<HTMLInputElement>}
}

export const TriStateSwitch: FC<TriStateSwitchProps> = ( {
  displayText,
  inputAttrs = (): void => {}
} ) => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.tags' } )

  return (
    <div className={styles.wrapper}>
      <div className={styles.switchContainer}>
        <label className={styles.switchElement}>
          <input
            { ...inputAttrs( 'REQUIRE' )}
            type='radio'
            value='REQUIRE'
            aria-label={`${t( 'labelRequire' )}${displayText}`}
          />
          <CheckIcon className='h-6'/>
        </label>
        <label className={styles.switchElement}>
          <input
            {...inputAttrs( 'IGNORE' )}
            type='radio'
            value='IGNORE'
            aria-label={`${t( 'labelIgnore' )}${displayText}`}
          />
          {displayText}
        </label>
        <label className={styles.switchElement}>
          <input
            {...inputAttrs( 'PROHIBIT' )}
            type='radio'
            value='PROHIBIT'
            aria-label={`${t( 'labelProhibit' )}${displayText}`}
          />
          <XMarkIcon className='h-6'/>
        </label>
      </div>
    </div>
  )
}
