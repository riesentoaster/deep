import React, { FC, ReactNode } from 'react'
import { shuffleArray, tamedRandom } from './helpers'
import { createContext, useContext, useEffect, useState } from 'react'
import { PlayerCounts } from './header/settingsHelpers'
import { PlayerSettingsContext } from './pages/Layout'
import { PopUp } from './generic/PopUp'
import { useTranslation } from 'react-i18next'
import { Ellipsis } from './generic/Ellipsis'

interface PlayersContextType {
  shouldDisplay: boolean
  nextPlayer: () => void
  currentPlayer: string
}

export const PlayersContext = createContext<PlayersContextType>( {
  shouldDisplay: false,
  nextPlayer: () => {},
  currentPlayer: ''
} )

interface PlayersContextProviderProps {
  children: ReactNode
}

export const PlayersContextProvider: FC<PlayersContextProviderProps> = ( { children } ) => {
  const { t } = useTranslation( 'common', { keyPrefix: 'players' } )
  const playerSettings = useContext( PlayerSettingsContext )
  const [playerCounts, setPlayerCounts] = useState<PlayerCounts>( {} )
  const [isNextPlayerAnnouncementOpen, setIsNextPlayerAnnouncementOpen] = useState( false )

  const updatePlayerCountsAfterTurn = ( name: string ): void => setPlayerCounts( {
    [name]: 0,
    ...Object.fromEntries(
      Object.entries( playerCounts )
        .filter( ( [k, ] ) => k !== name )
        .map( ( [k, v] ) => [k, v + 1] )
    )
  } )

  useEffect( () => {
    const prev = Object.keys( playerCounts )
    const now = playerSettings.players
    const added = now.filter( e => !prev.includes( e ) )
    const deleted = prev.filter( e => !now.includes( e ) )
    if ( added.length > 0 || deleted.length > 0 ) {
      const newPlayerCounts = { ...playerCounts }
      for ( const d of deleted )
        delete newPlayerCounts[d]
      for ( const a of added )
        newPlayerCounts[a] = Infinity
      setPlayerCounts( newPlayerCounts )
    }
  }, [playerCounts, playerSettings.players] )

  const playerCount = Object.keys( playerCounts ).length

  const currentPlayer = shuffleArray( Object.entries( playerCounts ) )
    .sort( tamedRandom( playerSettings.inOrder, ( [, v] ) => v ) )
    .map( ( [k, ] ) => k )
    .pop() || ''

  console.log( playerCounts )
  const nextPlayer = (): void => {
    if ( playerSettings.enable && currentPlayer ) {
      updatePlayerCountsAfterTurn( currentPlayer )
      if ( playerSettings.announceNextPlayer ) setIsNextPlayerAnnouncementOpen( true )
    }
  }

  const shouldDisplay = playerSettings.enable && playerCount > 1

  return (
    <PlayersContext.Provider value={{ shouldDisplay, nextPlayer, currentPlayer, }}>
      { children }
      <PopUp
        isOpen={isNextPlayerAnnouncementOpen}
        onClose={(): void => setIsNextPlayerAnnouncementOpen( false ) }
        closesOnAnyClick
      >
        <div className='float float-row'>
          <p>{t( 'nextPlayer' )}:</p>
          <Ellipsis className='text-[2rem] mx-auto mt-5'>
            {currentPlayer}
          </Ellipsis>
        </div>
      </PopUp>
    </PlayersContext.Provider>
  )
}
