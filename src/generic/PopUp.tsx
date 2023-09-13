import { ReactNode, useEffect, useRef } from 'react'
import styles from './PopUp.module.scss'

interface PopUpProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  closesOnClickOutside?: boolean
  closesOnAnyClick?: boolean
}

export const PopUp = ( {
  children,
  isOpen,
  onClose,
  closesOnClickOutside = false,
  closesOnAnyClick = false
}: PopUpProps ): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>( null )

  useEffect( () => {
    const handleClickOutside = ( event: MouseEvent ): void => {
      if ( isOpen && ( closesOnAnyClick ||
        ( closesOnClickOutside && ref.current && !ref.current.contains( event.target as Node ) )
      ) ) {
        onClose( )
        event.stopPropagation()
      }
    }
    document.addEventListener( 'click', handleClickOutside, true )
    return () => document.removeEventListener( 'click', handleClickOutside, true )
  }, [ref, isOpen, closesOnClickOutside, onClose, closesOnAnyClick] )

  return (
    <div className={`${styles.popupBackground} ${!isOpen && 'hidden'}`}>
      <div ref={ref} className={styles.popup}>
        {children}
      </div>
    </div>
  )
}
