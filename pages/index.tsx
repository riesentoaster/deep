import type { GetStaticProps } from 'next'
import { defaultFiltersObject, Filters } from '../components/Filters'
import { Question, questions as allQuestionsImport } from '../public/questions'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { AllQuestions } from '../components/AllQuestions'
import { useTranslation } from 'next-i18next'
import { RandomQuestion } from '../components/RandomQuestion'
import { LanguageSettings } from '../components/LanguageSettings'
import { BestOf3 } from '../components/BestOf3'

interface HomeProps {
  allQuestions: Question[]
}

export interface QuestionDisplayProps {
  questions: Question[];
  showAuthors: boolean;
}

export const modes: Record<string, ( p: QuestionDisplayProps ) => JSX.Element> = {
  'bestOf3': BestOf3,
  'randomQuestion': RandomQuestion,
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
      <footer className='flex flex-row justify-space flex-wrap justify-center'>
        <LanguageSettings/>
        <p className='border rounded-full px-5 m-5'>Visit this project on <a href='https://github.com/riesentoaster/deep'>GitHub</a></p>
      </footer>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'tags', 'questions'] ),
    allQuestions: allQuestionsImport
  },
} )
