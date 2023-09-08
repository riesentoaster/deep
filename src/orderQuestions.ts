import { DeepPartial } from 'react-hook-form'
import { OrderSettings } from './header/settingsHelpers'
import { Question } from './questions'
import { random } from './helpers'

export const order = ( e: DeepPartial<OrderSettings>, questions: Question[] ): Question[] =>
  e.random && e.byDeepness !== undefined ?
    questions
      .slice()
      .sort( random )
      .sort( ( a, b ) =>
        e.byDeepness as number > Math.random() ?
          random() :
          a.deepness - b.deepness + ( Math.random() / 10 - 0.05 )
      ) :
    questions
