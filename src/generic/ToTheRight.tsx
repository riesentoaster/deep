import styles from './ToTheRight.module.scss'

interface ToTheRightProps {
  mainChild: JSX.Element
  toTheRight: JSX.Element
}

export const ToTheRight = ( { mainChild, toTheRight }: ToTheRightProps ): JSX.Element => (
  <div className={styles.parent}>
    {mainChild}
    <div className={styles.toTheRight}>{toTheRight}</div>
  </div>
)
