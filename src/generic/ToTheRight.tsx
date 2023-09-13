import { FC, ReactNode } from 'react'
import styles from './ToTheRight.module.scss'

interface ToTheRightProps {
  mainChild: ReactNode
  toTheRight: ReactNode
}

export const ToTheRight: FC<ToTheRightProps> = ( { mainChild, toTheRight } ) => (
  <div className={styles.parent}>
    {mainChild}
    <div className={styles.toTheRight}>{toTheRight}</div>
  </div>
)
