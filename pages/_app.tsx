import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'i18next-ssg'
import { Workbox } from 'workbox-window'
import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'

function MyApp( { Component, pageProps }: AppProps ): JSX.Element {

  useEffect( () => {
    if ( 'serviceWorker' in navigator )
      new Workbox( '/service-worker.js' ).register()
  }, [] )

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default appWithTranslation( MyApp )
