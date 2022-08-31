import type { NextPage, GetStaticProps } from 'next'
import { defaultFiltersObject, Filters } from '../components/Filters'
import { Question, questions as allQuestions } from '../public/questions'
import { LanguageSettings } from '../components/LanguageSettings'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

const Home: NextPage = () => {
  const { t: t_common } = useTranslation( 'common' )
  const { t: t_questions } = useTranslation( 'questions' )

  const [filters, setFilters] = useState( defaultFiltersObject )

  return (
    <>
      <main>
        <Filters
          filters={filters}
          setFilters={setFilters }/>
        <hr />
        <h2 className='text-center'>{t_common( 'questions' )}</h2>
        <ul>
          {allQuestions
            .filter( filters.filterFunction )
            .map( e =>
              <li
                className='px-20 py-2'
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
  },
} )

export type QuestionFilter = ( q: Question ) => boolean
