import React from 'react'
import { random, reduceToObject } from './helpers'
import { createContext, useContext, useEffect, useState } from 'react'
import { PlayerCounts } from './header/settingsHelpers'
import { PlayerSettingsContext } from './pages/Layout'

interface UsePlayers {
  playerCounts: PlayerCounts
  updatePlayerCounts: ( name: string ) => void
  shouldDisplay: boolean
  nextPlayer: () => void
  currentPlayer: string
}

const PlayerCountsContext = createContext<PlayerCounts>( {} )
const UpdatePlayerCountsContext = createContext<( name: string ) => void>( () => {} )

export const usePlayers = ( ): UsePlayers => {
  const playerSettings = useContext( PlayerSettingsContext )
  const [playerCounts, setPlayerCounts] = useState<PlayerCounts>( {} )

  const playerCount = Object.keys( playerCounts ).length

  const updatePlayerCounts = ( name: string ): void => setPlayerCounts( {
    [name]: 0,
    ...Object
      .entries( playerCounts )
      .filter( ( [k, ] ) => k !== name )
      .map( ( [k, v] ) => ( { [k]: v + 1 } ) )
      .reduce( reduceToObject, {} )
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

  const currentPlayer = Object
    .entries( playerCounts )
    .filter( ( [, v] ) => v === Math.max( ...Object.values( playerCounts ) ) )
    .map( ( [k, ] ) => k )
    .sort( random )[0] || ''

  const nextPlayer = (): void => {
    if ( playerSettings.enable && currentPlayer )
      updatePlayerCounts( currentPlayer )
  }

  const shouldDisplay = playerSettings.enable && playerCount > 1
  return {
    playerCounts,
    updatePlayerCounts,
    currentPlayer,
    shouldDisplay,
    nextPlayer
  }
}

export const PlayersContext = ( { children }: {children: JSX.Element} ): JSX.Element => {
  const { playerCounts, updatePlayerCounts } = usePlayers()

  return ( <PlayerCountsContext.Provider value={playerCounts}>
    <UpdatePlayerCountsContext.Provider value={updatePlayerCounts}>
      {children}
    </UpdatePlayerCountsContext.Provider>
  </PlayerCountsContext.Provider> )
}
