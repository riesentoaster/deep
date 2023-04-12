import type { GetStaticProps } from 'next'
import { Question, questions as allQuestionsImport } from '../public/questions'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { LanguageSettings } from '../components/LanguageSettings'
import Head from 'next/head'
import { useMemo } from 'react'
import { BarPlot } from '../components/plots/BarPlot'
import { PiePlot } from '../components/plots/PiePlot'
import { ScatterPlot } from '../components/plots/ScatterPlot'

interface StatsProps {
    allQuestions: Question[]
}


const Stats = ( { allQuestions }: StatsProps ): JSX.Element=> {

  const { t } = useTranslation( 'common' )

  const deepnessData = useMemo( () =>
    allQuestions
      .map( e => e.deepness )
      .filter( ( e,i,a ) => a.indexOf( e ) === i )
      .sort()
      .map( e => ( {
        label: e,
        value: allQuestions.filter( f => f.deepness === e ).length
      } ) )
  , [allQuestions] )

  const tagData = useMemo( () => {
    const allTags = allQuestions
      .filter( e => Array.isArray( e.tags ) )
      .map( e => e.tags as string[] )
      .flat()
    return allTags
      .filter( ( e,i,a ) => a.indexOf( e ) === i )
      .map( e => ( { label: e , value: allTags.filter( f => f ===e ).length } ) )
      .sort( ( a,b ) => b.value - a.value )
  }
  ,[allQuestions] ).map( e => ( { ...e,label: t( e.label, { keyPrefix: 'tags' } ) } ) )

  const dateData = useMemo( () =>
    allQuestions
      .map( e => e.date )
      .filter( ( e,i,a ) => a.indexOf( e ) === i )
      .sort()
      .map( e => ( {
        label: new Date( e ).toDateString(),
        value: allQuestions.filter( f => f.date === e ).length
      } ) )
      .map( ( sum => e => ( { ...e, value: sum += e.value } ) )( 0 ) )
  , [allQuestions] )

  return (
    <>
      <Head><title>deep — stats</title></Head>
      <main>
        <h1>{t( 'title' , { keyPrefix: 'stats' } )}</h1>
        <hr/>
        <h2>{t( 'time' , { keyPrefix: 'stats' } )}</h2>
        <ScatterPlot data={dateData}/>
        <h2>{t( 'deepnesses' , { keyPrefix: 'stats' } )}</h2>
        <PiePlot data={deepnessData} />
        <h2>{t( 'tags' , { keyPrefix: 'stats' } )}</h2>
        <BarPlot data={tagData} />
      </main>
      <footer className='flex flex-row justify-space flex-wrap justify-center'>
        <LanguageSettings/>
        <p className='border rounded-full px-5 m-5'>Visit this project on <a href='https://github.com/riesentoaster/deep'>GitHub</a></p>
      </footer>
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

