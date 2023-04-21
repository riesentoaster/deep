import type { GetStaticPaths, GetStaticProps } from 'next'
import { Question, questions as allQuestionsImport } from '../../public/questions'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { useState } from 'react'
import { BestOfN } from '../../components/BestOfN'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { NoQuestionsLeft } from '../../components/NoQuestionsLeft'

interface BestOfNProps {
  allQuestions: Question[]
}

const BestOfNPage = ( { allQuestions }: BestOfNProps ): JSX.Element => {
  const [currentQuestions, setQuestions] = useState( allQuestions )
  const [showAuthors, setShowAuthors] = useState( true )

  const { n } = useRouter().query
  const { t } = useTranslation( 'common' )

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
          ( !n || Array.isArray( n ) ) ?
            <p className='color-red-400'>{t( 'urlInvalid' )}</p> :
            Number.parseInt( n ) === 0?
              <NoQuestionsLeft/>:
              <BestOfN questions={currentQuestions} showAuthors={showAuthors} n={Number.parseInt( n )}/>
        }
      </main>
      <Footer/>
    </>
  )
}

export default BestOfNPage

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'tags', 'questions'] ),
    allQuestions: allQuestionsImport
  },
} )

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:[{ params: { n: '1' } }, { params: { n: '3' } }, { params: { n: '5' } }],
    fallback: 'blocking'
  }
}
