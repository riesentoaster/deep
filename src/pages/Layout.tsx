import { Question, questions as allQuestions } from '../questions'
import { createContext, useEffect, useState } from 'react'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { Workbox } from 'workbox-window'
import { TriStateSwitchState } from '../generic/TriStateSwitch'
import {
  DeepPartial,
  DisplaySettings,
  FilterSettings,
  OrderSettings,
  defaultDisplaySettings,
  defaultFilterSettings
} from '../header/settingsHelpers'

const preOrderedQuestions = allQuestions.sort( ( a, b ) => a.index - b.index )

export const ChangeOrderSettingsContext = createContext<( e: DeepPartial<OrderSettings> ) => void>( () => {} )
export const ChangeFilterSettingsContext = createContext<( e: DeepPartial<FilterSettings> ) => void>( () => {} )
export const FilteredAndOrderedQuestionsContext = createContext( preOrderedQuestions )

export const DisplaySettingsContext = createContext( defaultDisplaySettings )
export const ChangeDisplaySettingsContext = createContext<( e: DisplaySettings ) => void>( ( ) => {} )

const random: ( a?: any, b?: any ) => number = () => Math.random() - 0.5

const order = ( e: DeepPartial<OrderSettings>, questions: Question[] ): Question[] =>
  e.random && e.byDeepness !== undefined ?
    questions
      .slice()
      .sort( random )
      .sort( ( a, b ) =>
        e.byDeepness as number > Math.random() ?
          random() :
          a.deepness - b.deepness + ( Math.random() / 10 - 0.05 )
      ) :
    questions

const filterTags = (
  q: Question,
  tags: DeepPartial<{[tagName: string]: TriStateSwitchState}>
): boolean => {
  const requiredTags = Object.entries( tags ).filter( e => e[1] === 'REQUIRE' ).map( e => e[0] )
  const prohibitedTags = Object.entries( tags ).filter( e => e[1] === 'PROHIBIT' ).map( e => e[0] )
  const hasAllRequiredTags = requiredTags.every( tag => q.tags?.includes( tag ) )
  const containsProhibitedTag = prohibitedTags.some( tag => q.tags?.includes( tag ) )
  return hasAllRequiredTags && !containsProhibitedTag
}

const filter = ( filters: DeepPartial<FilterSettings>, questions: Question[] ): Question[] => {
  let filtered = questions
  if ( filters.deepness !== undefined ) {
    filtered = filtered.filter( e => filters.deepness?.min === undefined || e.deepness >= filters.deepness.min )
    filtered = filtered.filter( e => filters.deepness?.max === undefined || e.deepness <= filters.deepness.max )
  }
  if ( filters.tags !== undefined )
    filtered = filtered.filter( e =>
      filterTags( e, filters.tags as DeepPartial<{[tagName: string]: TriStateSwitchState}> ) )
  return filtered
}

export const Layout = ( ): JSX.Element => {
  const [orderedQuestions, setOrderedQuestions] = useState( preOrderedQuestions )
  const [filteredQuestions, setFilteredQuestions] = useState( orderedQuestions )
  const [filterSettings, setFilterSettings] = useState<DeepPartial<FilterSettings>>( defaultFilterSettings )
  const [displaySettings, setDisplaySettings] = useState( defaultDisplaySettings )

  useEffect( () => {
    setFilteredQuestions( filter( filterSettings, orderedQuestions ).slice() )
  }, [filterSettings, orderedQuestions] )

  const location = useLocation()

  useEffect( () => {
    if ( 'serviceWorker' in navigator && process.env.NODE_ENV === 'production' ) {
      const wb = new Workbox( '/service-worker.js' )

      // once new sw is installed, reload page to make it work
      wb.addEventListener( 'waiting', () => {
        wb.addEventListener( 'controlling', () => window.location.reload() )
        wb.messageSkipWaiting()
      } )
      wb.register()
    }
  }, [] )

  // manually trigger service worker update on nav since no actual nav/load is done otherwise
  useEffect( () => {
    if ( 'serviceWorker' in navigator ) {
      navigator.serviceWorker.ready.then( ( registration ) =>
        registration.update().catch( e => console.log( 'could not update service worker', e ) )
      )
    }
  }, [location] )

  return (
    <>
      <FilteredAndOrderedQuestionsContext.Provider value={filteredQuestions}>
        <ChangeOrderSettingsContext.Provider
          value={( newOrder ): void => setOrderedQuestions( order( newOrder, preOrderedQuestions ) )}
        >
          <ChangeFilterSettingsContext.Provider value={setFilterSettings} >
            <ChangeDisplaySettingsContext.Provider value={setDisplaySettings}>
              <Header/>
            </ChangeDisplaySettingsContext.Provider>
          </ChangeFilterSettingsContext.Provider>
        </ChangeOrderSettingsContext.Provider>

        <main>
          <DisplaySettingsContext.Provider value={displaySettings}>
            <Outlet/>
          </DisplaySettingsContext.Provider>
        </main>
        <Footer/>
      </FilteredAndOrderedQuestionsContext.Provider>
    </> )
}
