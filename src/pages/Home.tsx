import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSettings } from '../header/displaySettings/LanguageSettings'
import styles from './home.module.scss'

export const Home: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'explanation' } )
  return (
    <div className={styles.container}>
      <div className='mt-[-3rem] mb-[-2rem] flex items-center flex-wrap-reverse justify-around py-3'>
        <blockquote className='shrink-0 my-4 mx-8'>{t( 'slogan' )}</blockquote>
        <LanguageSettings className='w-fit my-4 mx-8 text-center'/>
      </div>

      <hr/>

      <h2>{t( 'rules' )}</h2>
      <p>{t( 'rulesIntro' )}</p>
      <ul><li>{t( 'rule1' )}</li></ul>
      <br/>
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
      <br/>

      <hr/>

      <h2>{t( 'howTo' )}</h2>
      <p>{t( 'howToIntro' )}</p>
      <ul>
        <li>{t( 'howTo1' )}</li>
        <li>{t( 'howTo2' )}</li>
      </ul>
      <br/>

      <hr/>

      <h2>{t( 'install' )}</h2>
      <p>{t( 'installIntro' )} <a href={t( 'installExplanationLink' )}>{t( 'installExplanationText' )}</a></p>
    </div>
  )
}
