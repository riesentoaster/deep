
import { QuestionDisplayProps } from '../pages'
import { BestOfN } from './BestOfN'

export const BestOf3 = ( qdp: QuestionDisplayProps ): JSX.Element => BestOfN( { n:3, qdp } )
