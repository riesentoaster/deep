import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { PopUp } from '../../../PopUp'

interface ExplanationPopUpProps {
    children: JSX.Element
}

export const ExplanationPopUp = ( { children }: ExplanationPopUpProps ): JSX.Element => {
  const [isOpen, setIsOpen] = useState( false )

  return (
    <>
      <button onClick={(): void => setIsOpen( true )}><QuestionMarkCircleIcon className='h-2/3'/></button>
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen } closesOnClickOutside={true}>{children}</PopUp>
    </>
  )

}
