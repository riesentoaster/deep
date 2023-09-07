import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { PopUp } from './PopUp'
import { createElement, useState } from 'react'
import styles from './WithExplanation.module.scss'

interface WithExplanationProps {
  closedElement: JSX.Element
  explanation: JSX.Element
}

export const WithExplanation = ( { closedElement, explanation }: WithExplanationProps ): JSX.Element => {
  const [isOpen, setIsOpen] = useState( false )

  const button = (
    <button key={'button'} className={styles.button} onClick={(): void => setIsOpen( true )} >
      <QuestionMarkCircleIcon className='h-[1.4rem]'/>
    </button>
  )

  const mappedElement = createElement( closedElement.type, {}, [closedElement.props.children, button] )

  return (
    <div className={styles.outerDiv}>
      { mappedElement }
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen } closesOnClickOutside={true}>{explanation}</PopUp>
    </div>
  )
}
