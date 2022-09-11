import type { GetStaticProps } from 'next'
import { defaultFiltersObject, Filters } from '../components/Filters'
import { Question, questions as allQuestionsImport } from '../public/questions'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { AllQuestions } from '../components/AllQuestions'
import { useTranslation } from 'next-i18next'
import { RandomQuestion } from '../components/RandomQuestion'
import { LanguageSettings } from '../components/LanguageSettings'

interface HomeProps {
  allQuestions: Question[]
}

export interface QuestionDisplayProps {
  questions: Question[];
}

export const modes: Record<string, ( p: QuestionDisplayProps ) => JSX.Element> = {
  'allQuestions': AllQuestions,
  'randomQuestion': RandomQuestion
}


const Home = ( { allQuestions }: HomeProps ): JSX.Element => {
  const { t } = useTranslation( 'common' )

  const [filters, setFilters] = useState( defaultFiltersObject )

  const filteredQuestions = allQuestions.filter( filters.filterFunction )

  const modeComponents = Object.entries( modes )
    .map( ( [k,v] ) => ( { [k]: v( { questions: allQuestions.filter( filters.filterFunction ) } ) } ) )
    .reduce( ( acc, cur ) => Object.assign( acc, cur ), {} )

  return (
    <div hidden={!filters.loadedQuery}>
      <main >
        <Filters
          filters={filters}
          setFilters={setFilters}/>
        <hr />
        <h2 className='text-center'>{t( filters.mode )}</h2>
        {filteredQuestions.length > 0 && modeComponents[filters.mode]}
        {filteredQuestions.length === 0 && <p className='mx-auto w-max'>{t( 'noQuestionsLeft' )}</p>}
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
    allQuestions: allQuestionsImport.sort( ( a,b ) => Math.random() - 0.5 + ( ( a.deepness - b.deepness ) / 5 ) ** ( 4/5 ) )
  },
} )
