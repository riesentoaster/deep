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
      <button className='mx-auto mb-2'>
        <Ellipsis>
          <div className='flex flex-row' onClick={(): void => setHidden( !hidden )}>
            <h2>{title}</h2>
            <Bars3Icon className='h-6 inline pl-5 my-auto'/>
          </div>
        </Ellipsis>
      </button>
      <div className={`w-full ${hidden && 'hidden'}`}>
        {children}
      </div>
    </div>
  )
}
