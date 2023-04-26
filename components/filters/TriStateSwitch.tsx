import React from 'react'
import styles from './TriStateSwitch.module.scss'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface TriStateSwitchProps {
  text: string
  state: TriStateSwitchState
  setState: ( state: TriStateSwitchState ) => void
  setIfUnchanged?: boolean
}

export type TriStateSwitchState = 'REQUIRE' | 'IGNORE' | 'PROHIBIT';

export const TriStateSwitch = ( { text, state, setState, setIfUnchanged=true }: TriStateSwitchProps ): JSX.Element => {
  const change = ( state: TriStateSwitchState, element: TriStateSwitchState ) => (): void => {
    if ( setIfUnchanged || state !== element )
      setState( element )
  }
  return (
    <div className={styles[`switch__container--${state.toLocaleLowerCase()}`]}>
      <TriStateElement setElement={change( state, 'REQUIRE' )}><CheckIcon className='h-6'/></TriStateElement>
      <TriStateElement setElement={change( state, 'IGNORE' )}>{text}</TriStateElement>
      <TriStateElement setElement={change( state, 'PROHIBIT' )}><XMarkIcon className='h-6'/></TriStateElement>
    </div>
  )
}

interface TriStateElementProps {
   setElement: () => void;
   children: any
}

const TriStateElement = ( { setElement, children }: TriStateElementProps ): JSX.Element => (
  <div className={styles['switch__element']} onClick={setElement}>{children}</div>
)
