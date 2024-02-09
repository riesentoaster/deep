import { PWAInstallElement } from '@khmyznikov/pwa-install'
import PWAInstall from '@khmyznikov/pwa-install/src/fallback/react'
import React, { useRef, useState } from 'react'
import { Ellipsis } from './Ellipsis'
import { useTranslation } from 'react-i18next'

const installDescriptionsByLanguage = {
  en: {
    'description': 'Getting people to talk about what really matters',
    'installDescription': 'Install deep to make it available offline'
  },
  de: {
    'description': 'Über die wirklich wichtigen Dinge reden',
    'installDescription': 'Installiere deep, um offline spielen zu können',
  }
}

const InstallButton: React.FC = () => {
  const [ isInstallAvailable, setIsInstallAvailable ] = useState( false )
  const ref = useRef<null | PWAInstallElement>( null )
  const { t } = useTranslation( 'common', { keyPrefix: 'explanation' } )

  const browserLang = navigator.language.startsWith( 'en' ) ? 'en' : 'de'
  const { description, installDescription } = installDescriptionsByLanguage[browserLang]

  return (
    <div>
      <PWAInstall
        manualApple={true}
        manualChrome={true}
        ref={ref}
        onPwaInstallAvailableEvent={() => setIsInstallAvailable( true ) }
        description={description}
        installDescription={installDescription}
      />
      {isInstallAvailable && (
        <div className='text-center'>
          <h3 className='mb-3'>{t( 'install' )}</h3>
          <button type='button' onClick={() => ref.current?.showDialog()}>
            <Ellipsis >{t( 'showInstallInstructions' )}</Ellipsis>
          </button>
        </div>
      )}
    </div>
  )
}

export default InstallButton
