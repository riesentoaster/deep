import type { GetStaticProps } from 'next'
import { Question as QuestionInterface, questions as allQuestionsImport } from '../public/questions'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { useState } from 'react'
import { Question } from '../components/Question'
import { NoQuestionsLeft } from '../components/NoQuestionsLeft'

interface HomeProps {
  allQuestions: QuestionInterface[]
}

const Home = ( { allQuestions }: HomeProps ): JSX.Element => {
  const [currentQuestions, setQuestions] = useState( allQuestions )
  const [showAuthors, setShowAuthors] = useState( true )

  return (
    <>
      <Head><title>deep</title></Head>
      <Header
        allQuestions={allQuestions}
        currentQuestions={currentQuestions}
        setQuestions={setQuestions}
        setShowAuthors={setShowAuthors}
      />
      <main>
        {
          currentQuestions.length === 0 ?
            <NoQuestionsLeft/>:
            <ul className='w-fit mx-auto'>
              {currentQuestions.map( e =>
                <li
                  className='py-2'
                  key={e.index}>
                  <Question question={e} showAuthor={showAuthors}/>
                </li>
              )}
            </ul>
        }
      </main>
      <Footer/>
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
