import { Controller, useFormContext } from 'react-hook-form'
import { AddPlayer } from './AddPlayer'
import { PlayerNameEntry } from './PlayerNameEntry'
import { unique } from '../../helpers'

export const PlayerNameSettings = (): JSX.Element => useFormContext().getValues().enable && (
  <Controller
    name={'players'}
    render={( { field: { value, onChange } } ): JSX.Element => {
      return (
        <ul className='mt-4'>
          { value.map( ( name: string ) => (
            <PlayerNameEntry
              key={name}
              name={name}
              deletePlayer={(): void => onChange( value.filter( ( n: string ) => n !== name ) )}
            />
          ) )}
          <AddPlayer addPlayer={( newPlayer: string ): void => onChange( [...value, newPlayer].filter( unique ) )}/>
        </ul>
      )
    }}
  />
)
