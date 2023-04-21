import type { GetStaticProps } from 'next'
import { Question, questions as allQuestionsImport } from '../public/questions'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { StackedTimeSeriesPlot } from '../components/plots/StackedTimeSeriesPlot'
import { useMemo, useState } from 'react'
import { Header } from '../components/Header'

interface StatsProps {
    allQuestions: Question[]
}

const Stats = ( { allQuestions }: StatsProps ): JSX.Element=> {
  const [currentQuestions, setQuestions] = useState( allQuestions )

  const { t: tagsT } = useTranslation( 'common' )
  const { t: statsT } = useTranslation( 'common', { keyPrefix: 'stats' } )

  const deepnessEntries = useMemo( () =>
    currentQuestions.map( e => ( { date: e.date, series: e.deepness, value: 1 } ) ),
  [currentQuestions] )

  const tagsEntries = useMemo( () => {
    const res = []
    for ( const q of currentQuestions )
      if ( q.tags )
        for ( const tag of q.tags )
          res.push( { date: q.date, series: tagsT( tag, { keyPrefix: 'tags' } ), value: 1 } )
    return res
  },
  [currentQuestions, tagsT] )

  return (
    <>
      <Head><title>deep — stats</title></Head>
      <Header
        allQuestions={allQuestions}
        currentQuestions={currentQuestions}
        setQuestions={setQuestions}
        setShowAuthors={( ): void => {}}
      />
      <main>
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

