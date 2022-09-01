import { Bars3Icon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

interface DropdownProps {
    children: JSX.Element
    title: string
}

export const Dropdown = ( { children, title }: DropdownProps ): JSX.Element => {
  const { t } = useTranslation()
  const [hidden, setHidden] = useState( false )
  return (
    <div className='mx-auto'>
      <div className='flex flex-row mx-auto w-min justify-center border px-7 rounded-full' onClick={(): void => setHidden( !hidden )}>
        <h2>{t( title )}</h2>
        <Bars3Icon className='h-8 inline pl-5 my-auto'/>
      </div>
      <div className={`mx-auto w-max ${hidden && 'hidden'}`}>
        {children}
      </div>
    </div>
  )

}
