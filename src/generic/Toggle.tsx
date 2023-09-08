import { useFormContext } from 'react-hook-form'
import styles from './Toggle.module.scss'

interface ToggleProps {
  name: string
  className?: string
}
export const Toggle = ( { name, className = '' }: ToggleProps ): JSX.Element => (
  <div className={styles.wrapper}>
    <label className={`${className} ${styles.outer}`} >
      <input {...useFormContext().register( name )} type="checkbox" />
      <div/>
    </label>
  </div>
)
