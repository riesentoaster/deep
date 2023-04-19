import type { GetStaticProps } from 'next'
import { Question, questions as allQuestionsImport } from '../public/questions'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { StackedTimeSeriesPlot } from '../components/plots/StackedTimeSeriesPlot'
import { useMemo } from 'react'

interface StatsProps {
    allQuestions: Question[]
}

const Stats = ( { allQuestions }: StatsProps ): JSX.Element=> {

  const { t } = useTranslation( 'common' )

  const deepnessEntries = useMemo( () =>
    allQuestions.map( e => ( { date: e.date, series: e.deepness, value: 1 } ) ),
  [allQuestions] )

  const tagsEntries = useMemo( () => {
    const res = []
    for ( const q of allQuestions )
      if ( q.tags )
        for ( const tag of q.tags )
          res.push( { date: q.date, series: t( tag, { keyPrefix: 'tags' } ), value: 1 } )
    return res
  },
  [allQuestions, t] )

  return (
    <>
      <Head><title>deep — stats</title></Head>
      <main>
        <h1>{t( 'title' , { keyPrefix: 'stats' } )}</h1>
        <hr/>
        <h2>{t( 'deepnesses' , { keyPrefix: 'stats' } )}</h2>
        <h3>{t( 'added' , { keyPrefix: 'stats' } )}</h3>
        <StackedTimeSeriesPlot entries={deepnessEntries} />
        <h3>{t( 'cumulative' , { keyPrefix: 'stats' } )}</h3>
        <StackedTimeSeriesPlot entries={deepnessEntries} cumsum={true} />
        <hr/>
        <h2>{t( 'tags' , { keyPrefix: 'stats' } )}</h2>
        <h3>{t( 'added' , { keyPrefix: 'stats' } )}</h3>
        <StackedTimeSeriesPlot entries={tagsEntries} />
        <h3>{t( 'cumulative' , { keyPrefix: 'stats' } )}</h3>
        <StackedTimeSeriesPlot entries={tagsEntries} cumsum={true} />
      </main>
      <Footer/>
    </>
  )
}

export default Stats

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'tags', 'questions'] ),
    allQuestions: allQuestionsImport
  },
} )

