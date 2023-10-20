import { FC, ReactNode, useEffect, useRef } from 'react'
import styles from './PopUp.module.scss'

interface PopUpProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  closesOnAnyClick?: boolean
}

export const PopUp: FC<PopUpProps> = ( {
  children,
  isOpen,
  onClose,
  closesOnAnyClick = false
} ) => {
  const dialogRef = useRef<HTMLDialogElement | null>( null )
  const contentRef = useRef<HTMLDivElement | null>( null )

  useEffect( () => {
    const handleClickOutside = ( event: MouseEvent ): void => {
      if ( closesOnAnyClick || !contentRef.current?.contains( event.target as Node ) ) {
        onClose()
        dialogRef.current?.close()
        event.stopPropagation()
      }
    }
    if ( isOpen )
      document.addEventListener( 'click', handleClickOutside, true )
    return () => document.removeEventListener( 'click', handleClickOutside, true )
  }, [ dialogRef, isOpen, closesOnAnyClick, onClose ] )

  useEffect( () => {
    if ( isOpen ) {
      dialogRef.current?.showModal()
    }
  }, [ dialogRef, isOpen ] )

  return (
    <dialog ref={dialogRef} className={styles.popup}>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </dialog>
  )
}
