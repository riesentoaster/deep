import type { GetStaticProps } from 'next'
import { defaultFiltersObject, Filters } from '../components/Filters'
import { Question, questions as allQuestionsImport } from '../public/questions'
import { LanguageSettings } from '../components/LanguageSettings'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

interface HomeProps {
  allQuestions: Question[]
}

const Home = ( { allQuestions }: HomeProps ): JSX.Element => {
  const { t: t_common } = useTranslation( 'common' )
  const { t: t_questions } = useTranslation( 'questions' )

  const [filters, setFilters] = useState( defaultFiltersObject )

  return (
    <>
      <main>
        <Filters
          filters={filters}
          setFilters={setFilters}/>
        <hr />
        <h2 className='text-center'>{t_common( 'questions' )}</h2>
        <ul className='w-max mx-auto'>
          {allQuestions
            .filter( filters.filterFunction )
            .map( e =>
              <li
                className='py-2'
                key={e.index}>
                {t_questions( e.index )}
              </li>
            )}
        </ul>
      </main>
      <footer><LanguageSettings/></footer>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'tags', 'questions'] ),
    allQuestions: allQuestionsImport.sort( () => 0.5-Math.random() )
  },
} )
