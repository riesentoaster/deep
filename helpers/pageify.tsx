import { Question ,questions as allQuestions } from '../public/questions'
import { useState } from 'react'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

interface PageProps {
    questions: Question[]
    showAuthors: boolean
}

export type PageifyComponent = ( p: PageProps ) => JSX.Element

interface PageifyProps {
    child: PageifyComponent
}

export const Pageify = ( { child }: PageifyProps ): JSX.Element => {
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
        {child( { questions: currentQuestions, showAuthors: showAuthors } )}
      </main>
      <Footer/>
    </>
  )
}
