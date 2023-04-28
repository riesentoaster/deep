import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import styles from './PopUp.module.scss'

interface PopUpProps {
    children: JSX.Element
}

export const PopUp = ( { children }: PopUpProps ): JSX.Element => {
  const [isOpen, setIsOpen] = useState( false )
  const ref = useRef<HTMLDivElement | null>( null )

  useEffect( () => {
    if ( isOpen ) {
      const handleClickOutside = ( event: MouseEvent ): void => {
        if ( ref.current && !ref.current.contains( event.target as Node ) ) {
          setIsOpen( false )
          event.stopPropagation()
        }
      }
      document.addEventListener( 'click', handleClickOutside, true )
      return () => document.removeEventListener( 'click', handleClickOutside, true )
    }
  }, [ref, isOpen] )

  return (
    <>
      <button onClick={(): void => setIsOpen( true )}><QuestionMarkCircleIcon className='h-2/3'/></button>
      <div className={`${styles.popupBackground} ${!isOpen && 'hidden'}`}>
        <div ref={ref} className={styles.popup}>
          {children}
        </div>
      </div>
    </>
  )

}
