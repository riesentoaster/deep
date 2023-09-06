import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { PopUp } from './PopUp'
import { useState } from 'react'
import styles from './TitleWithExplanation.module.scss'

interface FiltersTitleProps {
  titleText: string
  explanation: JSX.Element
  size?: number
}

export const TitleWithExplanation = ( { titleText, explanation, size = 2 }: FiltersTitleProps ): JSX.Element => {
  const [isOpen, setIsOpen] = useState( false )

  const button = (
    <button className={styles.button} onClick={(): void => setIsOpen( true )} >
      <QuestionMarkCircleIcon className='h-[1.4rem]'/>
    </button>
  )

  const getTitle = ( text: string, size: number ): JSX.Element => {
    switch ( size ) {
      case 1: return ( <h1 className='mx-auto'>{text}{button}</h1> )
      case 3: return ( <h3 className='mx-auto'>{text}{button}</h3> )
      case 4: return ( <h4 className='mx-auto'>{text}{button}</h4> )
      default: return ( <h2 className='mx-auto'>{text}{button}</h2> )
    }
  }

  return (
    <div className={styles.outerDiv}>
      { getTitle( titleText, size ) }
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen } closesOnClickOutside={true}>{explanation}</PopUp>
    </div>
  )
}
