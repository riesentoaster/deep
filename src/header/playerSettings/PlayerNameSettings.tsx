import { Controller, useFormContext } from 'react-hook-form'
import { AddPlayer } from './AddPlayer'
import { PlayerNameEntry } from './PlayerNameEntry'
import { unique } from '../../helpers'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '../../generic/ErrorMessage'
import { FC, ReactElement } from 'react'

export const PlayerNameSettings: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.players' } )
  const { enable } = useFormContext().getValues()
  return enable && (
    <Controller
      name={'players'}
      render={( { field: { value, onChange } } ): ReactElement => {
        const addPlayer = ( newPlayer: string ): void =>
          onChange(
            [ ...value, newPlayer ]
              .filter( unique )
              .sort()
          )

        return (
          <ul className='mt-4'>
            {value.length < 2 && <li><ErrorMessage type='warn' text={t( 'errorMessageNotEnoughPlayers' )}/></li>}
            { value.map( ( name: string ) => (
              <PlayerNameEntry
                key={name}
                name={name}
                deletePlayer={(): void => onChange( value.filter( ( n: string ) => n !== name ) )}
              />
            ) )}
            <AddPlayer addPlayer={addPlayer}/>
          </ul>
        )
      }}
    />
  )
}
