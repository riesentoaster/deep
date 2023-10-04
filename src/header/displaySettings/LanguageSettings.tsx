import { useTranslation } from 'react-i18next'
import { EllipsisSwitch } from '../../generic/EllipsisSwitch'
import { FC } from 'react'
import { Language } from '../../questions/language'
const localeInLocale: Record<Language, string> = {
  de: 'Deutsch',
  en: 'English',
}

interface LanguageSettingsProps {
  className?: string
}

export const LanguageSettings: FC<LanguageSettingsProps> = ( { className } ) => {
  const { i18n, t } = useTranslation( 'common', { keyPrefix: 'header.display' } )
  const setLang = ( lang: string ): void => {
    i18n.changeLanguage( lang )
  }

  return (
    <>
      <div className={className}>
        <h3 className='mb-4'>{t( 'language' )}</h3>
        <EllipsisSwitch
          elements={localeInLocale}
          // elements={{ ...localeInLocale, ...( process.env.NODE_ENV === 'production' ? {} : { cimode: 'Test' } ) }}
          state={i18n.resolvedLanguage}
          setState={setLang}
        />
      </div>
    </>
  )
}

