import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en.json'
import { questionTranslations, tagTranslations } from './questions/questions'
import deCommon from './locales/de.json'

i18n
  .use( LanguageDetector )
  .use( initReactI18next ) // passes i18n down to react-i18next
  .init( {
    // the translations
    // (tip move them in a JSON file and import them
    resources: {
      en: {
        common: enCommon,
        tags: tagTranslations.en,
        questions: questionTranslations.en
      },
      de: {
        common: deCommon,
        tags: tagTranslations.de,
        questions: questionTranslations.de
      }
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  } )
