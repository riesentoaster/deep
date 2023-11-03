import { questions as allQuestions } from '../questions/questions'
import { FC, createContext, useEffect, useState } from 'react'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'
import { Outlet } from 'react-router-dom'
import {
  DeepPartial,
  DisplaySettings,
  FilterSettings,
  OrderSettings,
  PlayerSettings,
  defaultDisplaySettings,
  defaultFilterSettings,
  defaultOrderSettings,
  defaultPlayerSettings
} from '../header/settingsHelpers'
import { useServiceWorker } from '../useServiceWorker'
import { filter } from '../filterQuestions'
import { order } from '../orderQuestions'
import { PlayersContextProvider } from '../PlayersContext'

export const ChangeOrderSettingsContext = createContext<( e: DeepPartial<OrderSettings> ) => void>( () => {} )
export const ChangeFilterSettingsContext = createContext<( e: DeepPartial<FilterSettings> ) => void>( () => {} )
export const FilteredAndOrderedQuestionsContext = createContext( allQuestions )

export const PlayerSettingsContext = createContext( defaultPlayerSettings )
export const ChangePlayerSettingsContext = createContext<( e: PlayerSettings ) => void>( () => {} )

export const DisplaySettingsContext = createContext( defaultDisplaySettings )
export const ChangeDisplaySettingsContext = createContext<( e: DisplaySettings ) => void>( () => {} )

export const Layout: FC = () => {
  useServiceWorker()

  const [ orderedQuestions, setOrderedQuestions ] = useState( order( defaultOrderSettings, allQuestions ) )
  const [ filteredQuestions, setFilteredQuestions ] = useState( orderedQuestions )
  const [ filterSettings, setFilterSettings ] = useState<DeepPartial<FilterSettings>>( defaultFilterSettings )
  const [ displaySettings, setDisplaySettings ] = useState( defaultDisplaySettings )
  const [ playerSettings, setPlayerSettings ] = useState( defaultPlayerSettings )

  const updateOrder = ( newOrder: DeepPartial<OrderSettings> ): void =>
    setOrderedQuestions( order( newOrder, allQuestions ) )

  useEffect( () => {
    const lightMatcher = window.matchMedia( '(prefers-color-scheme: light)' )
    if ( lightMatcher.matches && displaySettings.mode )
      document.body.classList.add( 'dark-mode' )
    else
      document.body.classList.remove( 'dark-mode' )
    if ( !lightMatcher.matches && !displaySettings.mode )
      document.body.classList.add( 'light-mode' )
    else
      document.body.classList.remove( 'light-mode' )
  }, [ displaySettings.mode ] )

  useEffect( () => {
    setFilteredQuestions( filter( filterSettings, orderedQuestions ).slice() )
  }, [ filterSettings, orderedQuestions ] )

  return (
    <FilteredAndOrderedQuestionsContext.Provider value={filteredQuestions}>
      <PlayerSettingsContext.Provider value={playerSettings}>

        <ChangePlayerSettingsContext.Provider value={setPlayerSettings}>
          <ChangeOrderSettingsContext.Provider value={updateOrder} >
            <ChangeFilterSettingsContext.Provider value={setFilterSettings} >
              <ChangeDisplaySettingsContext.Provider value={setDisplaySettings}>
                <Header/>
              </ChangeDisplaySettingsContext.Provider>
            </ChangeFilterSettingsContext.Provider>
          </ChangeOrderSettingsContext.Provider>
        </ChangePlayerSettingsContext.Provider>

        <main>
          <DisplaySettingsContext.Provider value={displaySettings}>
            <PlayersContextProvider>
              <Outlet/>
            </PlayersContextProvider>
          </DisplaySettingsContext.Provider>
        </main>

        <Footer/>

      </PlayerSettingsContext.Provider>
    </FilteredAndOrderedQuestionsContext.Provider>
  )
}
