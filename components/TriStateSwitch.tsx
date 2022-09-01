import { useTranslation } from 'next-i18next'
import React from 'react'
import styles from './TriStateSwitch.module.scss'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface TriStateSwitchProps {
text: string;
state: TriStateSwitchState;
setState: ( state: TriStateSwitchState ) => void;
}

export type TriStateSwitchState = 'REQUIRE' | 'IGNORE' | 'PROHIBIT';

export const TriStateSwitch = ( { text, state, setState }: TriStateSwitchProps ): JSX.Element => {
  const { t } = useTranslation( 'tags' )
  return (
    <div className={styles[`switch__container--${state.toLocaleLowerCase()}`]}>
      <TriStateElement setElement={(): void => setState( 'REQUIRE' ) }><CheckIcon className='h-6'/></TriStateElement>
      <TriStateElement setElement={(): void => setState( 'IGNORE' )}>{t( text )}</TriStateElement>
      <TriStateElement setElement={(): void => setState( 'PROHIBIT' )}><XMarkIcon className='h-6'/></TriStateElement>
    </div>
  )
}

interface TriStateElementProps {
   setElement: () => void;
   children: any
}

export const TriStateElement = ( { setElement, children }: TriStateElementProps ): JSX.Element => (
  <div className={styles['switch__element']} onClick={setElement}>{children}</div>
)
