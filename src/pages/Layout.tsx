import { questions as allQuestions } from '../questions'
import { createContext, useEffect, useState } from 'react'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'
import { Outlet } from 'react-router-dom'
import {
  DeepPartial,
  DisplaySettings,
  FilterSettings,
  OrderSettings,
  PlayerCounts,
  PlayerSettings,
  defaultDisplaySettings,
  defaultFilterSettings,
  defaultPlayerSettings
} from '../header/settingsHelpers'
import { useServiceWorker } from '../useServiceWorker'
import { filter } from '../filterQuestions'
import { order } from '../orderQuestions'
import { reduceToObject } from '../helpers'

const preOrderedQuestions = allQuestions.sort( ( a, b ) => a.index - b.index )

export const ChangeOrderSettingsContext = createContext<( e: DeepPartial<OrderSettings> ) => void>( () => {} )
export const ChangeFilterSettingsContext = createContext<( e: DeepPartial<FilterSettings> ) => void>( () => {} )
export const FilteredAndOrderedQuestionsContext = createContext( preOrderedQuestions )

export const PlayerSettingsContext = createContext( defaultPlayerSettings )
export const ChangePlayerSettingsContext = createContext<( e: PlayerSettings ) => void>( () => {} )
export const PlayerCountsContext = createContext<PlayerCounts>( {} )
export const UpdatePlayerCountsContext = createContext<( name: string ) => void>( () => {} )

export const DisplaySettingsContext = createContext( defaultDisplaySettings )
export const ChangeDisplaySettingsContext = createContext<( e: DisplaySettings ) => void>( () => {} )

export const Layout = ( ): JSX.Element => {

  useServiceWorker()

  const [orderedQuestions, setOrderedQuestions] = useState( preOrderedQuestions )
  const [filteredQuestions, setFilteredQuestions] = useState( orderedQuestions )
  const [filterSettings, setFilterSettings] = useState<DeepPartial<FilterSettings>>( defaultFilterSettings )
  const [displaySettings, setDisplaySettings] = useState( defaultDisplaySettings )
  const [playerSettings, setPlayerSettings] = useState( defaultPlayerSettings )
  const [playerCounts, setPlayerCounts] = useState<PlayerCounts>( {} )

  const updatePlayerCounts = ( name: string ): void => setPlayerCounts( {
    [name]: 0,
    ...Object
      .entries( playerCounts )
      .filter( ( [k, ] ) => k !== name )
      .map( ( [k, v] ) => ( { [k]: v + 1 } ) )
      .reduce( reduceToObject, {} )
  } )

  useEffect( () => {
    setFilteredQuestions( filter( filterSettings, orderedQuestions ).slice() )
  }, [filterSettings, orderedQuestions] )

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

  return (
    <FilteredAndOrderedQuestionsContext.Provider value={filteredQuestions}>
      <PlayerSettingsContext.Provider value={playerSettings}>
        <ChangePlayerSettingsContext.Provider value={setPlayerSettings}>
          <ChangeOrderSettingsContext.Provider
            value={( newOrder ): void => setOrderedQuestions( order( newOrder, preOrderedQuestions ) )}
          >
            <ChangeFilterSettingsContext.Provider value={setFilterSettings} >
              <ChangeDisplaySettingsContext.Provider value={setDisplaySettings}>
                <Header/>
              </ChangeDisplaySettingsContext.Provider>
            </ChangeFilterSettingsContext.Provider>
          </ChangeOrderSettingsContext.Provider>
        </ChangePlayerSettingsContext.Provider>

        <main>
          <DisplaySettingsContext.Provider value={displaySettings}>
            <PlayerCountsContext.Provider value={playerCounts}>
              <UpdatePlayerCountsContext.Provider value={updatePlayerCounts}>
                <Outlet/>
              </UpdatePlayerCountsContext.Provider>
            </PlayerCountsContext.Provider>
          </DisplaySettingsContext.Provider>
        </main>

        <Footer/>

      </PlayerSettingsContext.Provider>
    </FilteredAndOrderedQuestionsContext.Provider>
  )
}
