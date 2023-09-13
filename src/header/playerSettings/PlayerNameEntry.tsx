import { XMarkIcon } from '@heroicons/react/24/outline'
import { ToTheRight } from '../../generic/ToTheRight'
import { FC } from 'react'

interface PlayerNameEntryProps {
  name: string
  deletePlayer: () => void
}

export const PlayerNameEntry: FC<PlayerNameEntryProps> = ( { name, deletePlayer } ) => (
  <li key={name}>
    <ToTheRight mainChild={name}
      toTheRight={
        <button type='button' className='h-full' onClick={deletePlayer}>
          <XMarkIcon className='h-full'/>
        </button>
      }/>
  </li>
)
