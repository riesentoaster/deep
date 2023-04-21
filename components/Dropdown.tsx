import { Bars3Icon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Ellipsis } from './Ellipsis'

interface DropdownProps {
  title: string
  children?: JSX.Element
  defaultHiddenState?: boolean
  className?: string
}

export const Dropdown = ( { children, title, className='', defaultHiddenState=false }: DropdownProps ): JSX.Element => {
  const [hidden, setHidden] = useState( defaultHiddenState )
  return (
    <div className={`mx-auto ${className}`}>
      <Ellipsis className='mx-auto mb-2'>
        <div className='flex flex-row' onClick={(): void => setHidden( !hidden )}>
          <h2>{title}</h2>
          <Bars3Icon className='h-6 inline pl-5 my-auto'/>
        </div>
      </Ellipsis>
      <div className={`w-full ${hidden && 'hidden'}`}>
        {children}
      </div>
    </div>
  )

}
