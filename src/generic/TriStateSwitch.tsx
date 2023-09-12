import styles from './TriStateSwitch.module.scss'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

export type TriStateSwitchState = 'REQUIRE' | 'IGNORE' | 'PROHIBIT';

interface TriStateElementProps {
  setElement: () => void
  children: JSX.Element | string
}

const TriStateElement = ( { setElement, children }: TriStateElementProps ): JSX.Element => (
  <button type='button' className={styles.switchElement} onClick={setElement}>{children}</button>
)

interface TriStateSwitchProps {
  text: string
  state: TriStateSwitchState
  setState: ( state: TriStateSwitchState ) => void
  setIfUnchanged?: boolean
}

export const TriStateSwitch = ( {
  text,
  state,
  setState,
  setIfUnchanged = true
}: TriStateSwitchProps ): JSX.Element => {
  const change = ( state: TriStateSwitchState, element: TriStateSwitchState ) => (): void => {
    if ( setIfUnchanged || state !== element )
      setState( element )
  }
  return (
    <div className={styles[`switchContainer--${state.toLocaleLowerCase()}`]}>
      <TriStateElement setElement={change( state, 'REQUIRE' )}><CheckIcon className='h-6'/></TriStateElement>
      <TriStateElement setElement={change( state, 'IGNORE' )}>{text}</TriStateElement>
      <TriStateElement setElement={change( state, 'PROHIBIT' )}><XMarkIcon className='h-6'/></TriStateElement>
    </div>
  )
}
