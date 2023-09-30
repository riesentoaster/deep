import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { PopUp } from './PopUp'
import { FC, ReactNode, useState } from 'react'
import { ToTheRight } from './ToTheRight'

interface WithExplanationProps {
  closedElement: ReactNode
  explanation: ReactNode
}

export const WithExplanation: FC<WithExplanationProps> = ( { closedElement, explanation } ) => {
  const [ isOpen, setIsOpen ] = useState( false )

  return ( <ToTheRight
    mainChild={
      <>
        {closedElement}
        <PopUp isOpen={isOpen} onClose={(): void => setIsOpen( false )} closesOnClickOutside>{explanation}</PopUp>
      </>
    }
    toTheRight={
      <button type='button' key={'button'} onClick={(): void => setIsOpen( true )} >
        <QuestionMarkCircleIcon className='h-[1.4rem]'/>
      </button>
    }/> )

}
