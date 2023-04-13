import type { GetStaticProps } from 'next'
import { defaultFiltersObject, Filters } from '../components/Filters'
import { Question, questions as allQuestionsImport } from '../public/questions'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { AllQuestions } from '../components/AllQuestions'
import { useTranslation } from 'next-i18next'
import { BestOf3, BestOf5, RandomQuestion } from '../components/BestOfN'
import Head from 'next/head'
import { Footer } from '../components/Footer'

interface HomeProps {
  allQuestions: Question[]
}

export interface QuestionDisplayProps {
  questions: Question[];
  showAuthors: boolean;
}

export const modes: Record<string, ( p: QuestionDisplayProps ) => JSX.Element> = {
  'randomQuestion': RandomQuestion,
  'bestOf3': BestOf3,
  'bestOf5': BestOf5,
  'allQuestions': AllQuestions,
}


const Home = ( { allQuestions }: HomeProps ): JSX.Element => {
  const { t } = useTranslation( 'common' )
  const [questions, setQuestions] = useState<Question[]>( [] )
  const [filters, setFilters] = useState( defaultFiltersObject )

  useEffect( () => {
    const sortedQuestions = allQuestions
      .sort( ( ) => Math.random()-0.5 )
      .sort( ( a,b ) => filters.randomness > Math.random() ? Math.random() - 0.5 : a.deepness - b.deepness + ( Math.random() / 10 - 0.05 ) )
    const filteredQuestions = sortedQuestions.filter( filters.filterFunction )
    setQuestions( filteredQuestions )
  }, [filters, allQuestions] )

  const modeComponents = Object.entries( modes )
    .map( ( [k,v] ) => ( { [k]: v( { questions, showAuthors:filters.showAuthors } ) } ) )
    .reduce( ( acc, cur ) => Object.assign( acc, cur ), {} )

  return (
    <>
      <Head><title>deep</title></Head>
      <div hidden={!filters.loadedQuery}>
        <main >
          <Filters
            filters={filters}
            setFilters={setFilters}/>
          <hr />
          <h2 className='text-center'>{t( filters.mode )}</h2>
          {questions.length > 0 && modeComponents[filters.mode]}
          {questions.length === 0 && <p className='mx-auto w-max'>{t( 'noQuestionsLeft' )}</p>}
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'tags', 'questions'] ),
    allQuestions: allQuestionsImport
  },
} )
