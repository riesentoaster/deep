import { DeepPartial } from 'react-hook-form'
import { OrderSettings, defaultOrderSettings } from './header/settingsHelpers'
import { Question } from './questions'
import { random } from './helpers'

export const order = ( e: DeepPartial<OrderSettings>, questions: Question[] ): Question[] =>
  e.random ?
    questions
      .slice()
      .sort( random )
      .sort( ( a, b ) =>
        ( e.byDeepness || defaultOrderSettings.byDeepness ) > Math.random() ?
          random() :
          a.deepness - b.deepness + ( Math.random() / 10 - 0.05 )
      ) :
    questions
