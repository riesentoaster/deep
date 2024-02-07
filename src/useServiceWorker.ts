import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useServiceWorker = (): void => {
  const location = useLocation()
  // manually trigger service worker update on nav since no actual nav/load is done otherwise
  useEffect( () => {
    if ( 'serviceWorker' in navigator ) {
      navigator.serviceWorker.ready.then( ( registration ) =>
        registration.update().catch( e => console.log( 'could not update service worker', e ) )
      )
    }
  }, [ location ] )
}
