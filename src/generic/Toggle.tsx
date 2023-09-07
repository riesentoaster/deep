import { Controller } from 'react-hook-form'
import styles from './Toggle.module.scss'

interface ToggleProps {
  name: string
  className?: string
}
export const Toggle = ( { name, className = '' }: ToggleProps ): JSX.Element => (
  <Controller
    name={name}
    render={( { field: { value, onChange } } ): JSX.Element => (
      <button
        onClick={(): void => onChange( !value )}
        className={`${className} ${styles.outer} ${value ? styles.outerOn : styles.outerOff}`}
      >
        <div className={`${styles.inner} ${value ? styles.innerOn : styles.innerOff}`} />
      </button>
    )}/>
)
