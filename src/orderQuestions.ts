import { DeepPartial } from 'react-hook-form'
import { OrderSettings, defaultOrderSettings } from './header/settingsHelpers'
import { Question } from './questions'
import { shuffleArray, tamedRandom } from './helpers'

export const order = ( e: DeepPartial<OrderSettings>, questions: Question[] ): Question[] =>
  ( !e.random ) ?
    questions :
    shuffleArray( questions )
      .sort( tamedRandom( e.byDeepness || defaultOrderSettings.byDeepness, q => q.deepness ) )
