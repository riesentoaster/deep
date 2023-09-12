
import { random } from './helpers'
import { useContext } from 'react'
import { PlayerCountsContext, PlayerSettingsContext, UpdatePlayerCountsContext } from './pages/Layout'

interface UsePlayers {
  shouldDisplay: boolean
  nextPlayer: () => void
  currentPlayer: string
}

export const usePlayers = ( ): UsePlayers => {
  const playerCounts = useContext( PlayerCountsContext )
  const playerSettings = useContext( PlayerSettingsContext )
  const updatePlayerCounts = useContext( UpdatePlayerCountsContext )
  const playerCount = Object.keys( playerCounts ).length

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
    currentPlayer,
    shouldDisplay,
    nextPlayer
  }
}
