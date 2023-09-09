import { KeyboardEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Ellipsis } from '../../generic/Ellipsis'

interface AddPlayerProps {
  addPlayer: ( name: string ) => void
}

export const AddPlayer = ( { addPlayer }: AddPlayerProps ): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.players' } )
  const [value, setValue] = useState( '' )
  const trigger = ( ): void => {
    setValue( '' )
    addPlayer( value.trim() )
  }

  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = ( e ) => {
    if ( e.key === 'Enter' && isLegal )
      trigger()
  }

  const isLegal = value.trim() !== ''
  return (
    <li className='mt-3 flex flex-col'>
      <input
        type="text"
        className='h-inherit rounded-full py-[0.1em] px-[1em]'
        value={value}
        onChange={( e ): void => setValue( e.target.value )}
        onKeyDown={keyDownHandler}
      />
      <button
        type='button'
        className='mx-auto mt-3'
        onClick={trigger}
        disabled={!isLegal}
      >
        <Ellipsis>
          <>{t( 'addPlayer' )}</>
        </Ellipsis>
      </button>
    </li>
  )
}
