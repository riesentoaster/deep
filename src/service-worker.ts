/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
declare const self: ServiceWorkerGlobalScope

clientsClaim()

precacheAndRoute( self.__WB_MANIFEST )
registerRoute( new NavigationRoute( createHandlerBoundToURL( '/index.html' ) ) )

addEventListener( 'message', ( event ) => {
  if ( event.data && event.data.type === 'SKIP_WAITING' )
    self.skipWaiting()
} )

