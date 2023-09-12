import { useEffect, useRef } from 'react'
import styles from './PopUp.module.scss'

interface PopUpProps {
  children: JSX.Element | string
  isOpen: boolean
  setIsOpen: ( e: boolean ) => void
  closesOnClickOutside?: boolean
}

export const PopUp = ( { children, isOpen, setIsOpen, closesOnClickOutside = false }: PopUpProps ): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>( null )

  useEffect( () => {
    if ( closesOnClickOutside && isOpen ){
      const handleClickOutside = ( event: MouseEvent ): void => {
        if ( ref.current && !ref.current.contains( event.target as Node ) ) {
          setIsOpen( false )
          event.stopPropagation()
        }
      }
      document.addEventListener( 'click', handleClickOutside, true )
      return () => document.removeEventListener( 'click', handleClickOutside, true )
    }
  }, [ref, isOpen, closesOnClickOutside, setIsOpen] )

  return (
    <div className={`${styles.popupBackground} ${!isOpen && 'hidden'}`}>
      <div ref={ref} className={styles.popup}>
        {children}
      </div>
    </div>
  )
}
