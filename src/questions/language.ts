import { questionsByDate } from './questionsByDate'

export type Language = 'de' | 'en'

export const DEFAULT_LANGUAGE: Language = 'en'
const extractedTranslations = Object.values( questionsByDate ).flat().map( e => e.translations )

export const questionTranslations = {
  en: Object.fromEntries( extractedTranslations.map( e => ( [ e[DEFAULT_LANGUAGE], e.en ] ) ) ),
  de: Object.fromEntries( extractedTranslations.map( e => ( [ e[DEFAULT_LANGUAGE], e.de ] ) ) ),
}
