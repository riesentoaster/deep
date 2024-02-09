import { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSettings } from '../header/displaySettings/LanguageSettings'
import styles from './home.module.scss'
import { Question } from '../generic/Question'
import { questionOfTheDay } from '../questions/questionOfTheDay'
import PWAInstall from '@khmyznikov/pwa-install/src/fallback/react'
import { PWAInstallElement } from '@khmyznikov/pwa-install'
import { Ellipsis } from '../generic/Ellipsis'

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

export const Home: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'explanation' } )
  const ref = useRef<null | PWAInstallElement>( null )
  const standalone = window.matchMedia( '(display-mode: standalone)' ).matches
  const browserLang = navigator.language.startsWith( 'en' ) ? 'en' : 'de'
  const { description, installDescription } = installDescriptionsByLanguage[browserLang]
  return (
    <div className={styles.container}>
      {
        !standalone && (
          <PWAInstall
            ref={ref}
            description={description}
            installDescription={installDescription}
          />
        )}
      <div className={styles.wrap}>
        <div className='text-center'>
          <h3 className='mb-3'>{t( 'questionOfTheDay' )}</h3>
          <Question question={questionOfTheDay}/>
        </div>
        <LanguageSettings className='w-fit text-center'/>
        {
          !standalone && (
            <div className='text-center'>
              <h3 className='mb-3'>{t( 'install' )}</h3>
              <button type='button' onClick={() => ref.current?.showDialog( true )}>
                <Ellipsis >{t( 'showInstallInstructions' )}</Ellipsis>
              </button>
            </div>
          )}
      </div>

      <hr/>

      <h2>{t( 'howTo' )}</h2>
      <p>{t( 'howToIntro' )}</p>
      <ul>
        <li>{t( 'howTo1' )}</li>
        <li>{t( 'howTo2' )}</li>
      </ul>

      <hr/>

      <h2>{t( 'rules' )}</h2>
      <p>{t( 'rulesIntro' )}</p>
      <ul><li>{t( 'rule1' )}</li></ul>

      <p>{t( 'rulesExplanation' )}</p>
      <br/>

      <p>{t( 'adviceIntro' )}</p>
      <ul>
        <li>{t( 'advice1' )}</li>
        <li>{t( 'advice2' )}</li>
        <li>{t( 'advice3' )}</li>
        <li>{t( 'advice4' )}</li>
        <li>{t( 'advice5' )}</li>
      </ul>

      <hr/>

      <h2>{t( 'contribute' )}</h2>
      <p className={styles.center}>
        {t( 'contributeIntro' )}
        <a href='https://github.com/riesentoaster/deep/issues'>
          {t( 'contributeLinkText' )}
        </a>
        {t( 'contributePostLink' )}
        <a href="mailto:deep@valentinhuber.me">
          {t( 'contributeEmailLinkText' )}
        </a>
        {t( 'contributePostEmailLinkText' )}
      </p>
    </div>
  )
}
