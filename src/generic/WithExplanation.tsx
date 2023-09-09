import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { PopUp } from './PopUp'
import { useState } from 'react'
import { ToTheRight } from './ToTheRight'

interface WithExplanationProps {
  closedElement: JSX.Element
  explanation: JSX.Element
}

export const WithExplanation = ( { closedElement, explanation }: WithExplanationProps ): JSX.Element => {
  const [isOpen, setIsOpen] = useState( false )

  return ( <ToTheRight
    mainChild={
      <>
        {closedElement}
        <PopUp isOpen={isOpen} setIsOpen={setIsOpen} closesOnClickOutside={true}>{explanation}</PopUp>
      </>
    }
    toTheRight={
      <button type='button' key={'button'} onClick={(): void => setIsOpen( true )} >
        <QuestionMarkCircleIcon className='h-[1.4rem]'/>
      </button>
    }/> )

}