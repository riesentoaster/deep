import { useFormContext } from 'react-hook-form'
import styles from './Toggle.module.scss'
import { FC } from 'react'

interface ToggleProps {
  name: string
  className?: string
}
export const Toggle: FC<ToggleProps> = ( { name, className = '' } ) => (
  <div className={styles.wrapper}>
    <label className={`${className} ${styles.outer}`} >
      <input {...useFormContext().register( name )} type="checkbox" />
      <div/>
    </label>
  </div>
)
