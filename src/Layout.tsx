import { Question, questions as allQuestions } from './questions'
import { createContext, useEffect, useState } from 'react'
import { filterQuestions } from './components/filters/filtersHelpers'
import { defaultValues } from './components/filters/Filters'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { Workbox } from 'workbox-window'

export const CurrentQuestionsContext = createContext<Question[]>( [] )
export const CurrentShowAuthorsContext = createContext( true )

export const Layout = ( ): JSX.Element => {
  const [questions, setQuestions] = useState<Question[]>( [] )
  const [showAuthors, setShowAuthors] = useState( true )
  const [loaded, setLoaded] = useState( false )

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

  useEffect( () => {
    setQuestions( filterQuestions( allQuestions, defaultValues ) )
    setLoaded( true )
  }, [] )

  if ( !loaded )
    return ( <></> )
  else
    return (
      <>
        <Header
          currentQuestions={questions}
          setQuestions={setQuestions}
          setShowAuthors={setShowAuthors}
        />
        <main>
          <CurrentQuestionsContext.Provider value={questions}>
            <CurrentShowAuthorsContext.Provider value={showAuthors}>
              <Outlet/>
            </CurrentShowAuthorsContext.Provider>
          </CurrentQuestionsContext.Provider>
        </main>
        <Footer/>
      </> )
}
