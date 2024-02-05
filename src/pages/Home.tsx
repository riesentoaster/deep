import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSettings } from '../header/displaySettings/LanguageSettings'
import styles from './home.module.scss'
import { Question } from '../generic/Question'
import { questionOfTheDay } from '../questions/questionOfTheDay'

export const Home: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'explanation' } )

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className='text-center'>
          <h3 className='mb-3'>{t( 'questionOfTheDay' )}</h3>
          <Question question={questionOfTheDay}/>
        </div>
        <LanguageSettings className='w-fit text-center'/>
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

      <h2>{t( 'install' )}</h2>
      <p className={styles.center}>
        {t( 'installIntro' )}
        <a href={t( 'installExplanationLink' )}>
          {t( 'installExplanationText' )}
        </a>
      </p>

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
