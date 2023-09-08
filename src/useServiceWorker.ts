import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Workbox } from 'workbox-window'

export const useServiceWorker = ( ): void => {
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
}
