import { useTranslation } from 'react-i18next'
import { StackedTimeSeriesPlot } from './components/plots/StackedTimeSeriesPlot'
import { useContext, useMemo } from 'react'
import { CurrentQuestionsContext } from './Layout'

export const Stats = ( ): JSX.Element => {

  const { t: tagsT } = useTranslation( 'common', { keyPrefix: 'tags' } )
  const { t: statsT } = useTranslation( 'common', { keyPrefix: 'stats' } )
  const questions = useContext( CurrentQuestionsContext )

  const deepnessEntries = useMemo( () =>
    questions.map( e => ( { date: e.date, series: e.deepness } ) ),
  [questions] )

  const tagsEntries = useMemo( () => {
    const res = []
    for ( const q of questions )
      if ( q.tags )
        for ( const tag of q.tags )
          res.push( { date: q.date, series: tagsT( tag ) } )
    return res
  }, [questions, tagsT] )

  return ( <>
    <h2>{statsT( 'deepnesses' )}</h2>
    <h3>{statsT( 'added' )}</h3>
    <StackedTimeSeriesPlot entries={deepnessEntries} />
    <h3>{statsT( 'cumulative' )}</h3>
    <StackedTimeSeriesPlot entries={deepnessEntries} cumsum={true} />
    <hr/>
    <h2>{statsT( 'tags' )}</h2>
    <h3>{statsT( 'added' )}</h3>
    <StackedTimeSeriesPlot entries={tagsEntries} />
    <h3>{statsT( 'cumulative' )}</h3>
    <StackedTimeSeriesPlot entries={tagsEntries} cumsum={true} />
  </>
  )
}

