import { useTranslation } from 'react-i18next'
import { CurrentQuestionsContext } from './Layout'
import { RechartsPlot } from './components/plots/Plot'
import { useContext } from 'react'
import { Question } from './questions'

export const Stats = ( ): JSX.Element => {

  const { t: tagsT } = useTranslation( 'common', { keyPrefix: 'tags' } )
  const { t: statsT } = useTranslation( 'common', { keyPrefix: 'stats' } )
  const questions = useContext( CurrentQuestionsContext )

  const deepnessGrouper = ( q: Question ): string => q.deepness.toString()
  const tagGrouper = ( q: Question ): string[] => q.tags?.map( tag => tagsT( tag ) ) || []

  return ( <>
    <h2>{statsT( 'deepnesses' )}</h2>
    <h3>{statsT( 'added' )}</h3>
    <RechartsPlot questions={questions} groupBy={deepnessGrouper}/>
    <h3>{statsT( 'cumulative' )}</h3>
    <RechartsPlot questions={questions} groupBy={deepnessGrouper} cumsum/>
    <hr/>
    <h2>{statsT( 'tags' )}</h2>
    <h3>{statsT( 'added' )}</h3>
    <RechartsPlot questions={questions} groupBy={tagGrouper}/>
    <h3>{statsT( 'cumulative' )}</h3>
    <RechartsPlot questions={questions} groupBy={tagGrouper} cumsum/>
  </>
  )
}

