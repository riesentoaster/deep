import { useTranslation } from 'react-i18next'
import { EllipsisSwitch } from '../../generic/EllipsisSwitch'
const localeInLocale: Record<string, string> = {
  de: 'Deutsch',
  en: 'English',
}

export const LanguageSettings = ( ): JSX.Element => {
  const { i18n } = useTranslation()
  const setLang = ( lang: string ): void => {
    i18n.changeLanguage( lang )
  }

  return (
    <EllipsisSwitch
      elements={localeInLocale}
      // elements={{ ...localeInLocale, ...( process.env.NODE_ENV === 'production' ? {} : { cimode: 'Test' } ) }}
      state={i18n.resolvedLanguage}
      setState={setLang}
    />
  )
}

