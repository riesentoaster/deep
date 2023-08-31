import { Question, questions as allQuestions } from '../shared/questions'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { filterQuestions } from '../components/filters/filtersHelpers'
import { defaultValues } from '../components/filters/Filters'

interface PageProps {
    questions: Question[]
    showAuthors: boolean
}

export type PageifyComponent = ( p: PageProps ) => JSX.Element

interface PageifyProps {
    child: PageifyComponent
}

export const Pageify = ( { child }: PageifyProps ): JSX.Element => {
  const [currentQuestions, setQuestions] = useState<Question[]>( [] )
  const [showAuthors, setShowAuthors] = useState( true )
  const [loaded, setLoaded] = useState( false )

  // always render to trigger hooks
  const childJSX = child( { questions: currentQuestions, showAuthors: showAuthors } )

  // filter first to set order of questions
  useEffect( () => {
    setQuestions( filterQuestions( allQuestions, defaultValues ) )
    setLoaded( true )
  }, [] )

  if ( !loaded )
    return ( <></> )
  else
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
          { childJSX }
        </main>
        <Footer/>
      </>
    )
}
