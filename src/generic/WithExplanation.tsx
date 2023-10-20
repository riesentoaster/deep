import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { PopUp } from './PopUp'
import { FC, ReactNode, useState } from 'react'
import { ToTheRight } from './ToTheRight'
import { useTranslation } from 'react-i18next'

interface WithExplanationProps {
  closedElement: ReactNode
  explanation: ReactNode
}

export const WithExplanation: FC<WithExplanationProps> = ( { closedElement, explanation } ) => {
  const [ isOpen, setIsOpen ] = useState( false )
  const { t } = useTranslation( 'common', { keyPrefix: 'header' } )

  return ( <ToTheRight
    mainChild={
      <>
        {closedElement}
        <PopUp isOpen={isOpen} onClose={(): void => setIsOpen( false )}>{explanation}</PopUp>
      </>
    }
    toTheRight={
      <button aria-label={t( 'explanation' )} type='button' key={'button'} onClick={(): void => setIsOpen( true )} >
        <QuestionMarkCircleIcon className='h-[1.4rem]'/>
      </button>
    }/> )

}
