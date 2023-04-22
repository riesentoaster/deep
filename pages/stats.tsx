import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { StackedTimeSeriesPlot } from '../components/plots/StackedTimeSeriesPlot'
import { useMemo } from 'react'
import { Pageify, PageifyComponent } from '../helpers/pageify'

const StatsComponent: PageifyComponent = ( { questions } ) => {

  const { t: tagsT } = useTranslation( 'common', { keyPrefix: 'tags' } )
  const { t: statsT } = useTranslation( 'common', { keyPrefix: 'stats' } )

  const deepnessEntries = useMemo( () =>
    questions.map( e => ( { date: e.date, series: e.deepness, value: 1 } ) ),
  [questions] )

  const tagsEntries = useMemo( () => {
    const res = []
    for ( const q of questions )
      if ( q.tags )
        for ( const tag of q.tags )
          res.push( { date: q.date, series: tagsT( tag ), value: 1 } )
    return res
  },
  [questions, tagsT] )

  return (
    <>
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
const Stats = (): JSX.Element => Pageify( { child: StatsComponent } )
export default Stats

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'tags', 'questions'] ),
  },
} )

