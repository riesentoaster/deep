import type { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { NoQuestionsLeft } from '../../components/NoQuestionsLeft'
import { Pageify, PageifyComponent } from '../../helpers/pageify'
import { Question } from '../../public/questions'
import { mod } from '../../helpers/helpers'
import { useState } from 'react'
import { Question as QuestionElement } from '../../components/Question'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const filterQuestions = ( questions: Question[], index: number, n: number ): Question[] => {
  if ( questions.length === 0 || questions.length < n ) return questions
  const normalizedIndex = mod( index, questions.length )
  const firstNumber = mod( normalizedIndex*n, questions.length )
  const allowedNumbers = Array( n ).fill( 1 ).map( ( _,j ) => mod( firstNumber+j, questions.length ) )
  return allowedNumbers.map( e => questions[e] )
}

const BestOfNComponent: PageifyComponent = ( { questions, showAuthors } ) => {
  const [index, setIndex] = useState( 0 )
  const { n } = useRouter().query
  const { t } = useTranslation( 'common' )

  if ( !n || Array.isArray( n ) ) return ( <p className='color-red-400'>{t( 'urlInvalid' )}</p> )

  const intN = Number.parseInt( n )

  if ( isNaN( intN ) ) return ( <p className='color-red-400'>{t( 'urlInvalid' )}</p> )

  if ( intN === 0 ) return <NoQuestionsLeft/>

  return (
    <div className='py-5 flex flex-row'>
      {questions.length > intN && <ChevronLeftIcon className='h-6 w-6 grow shrink-0 my-auto' onClick={(): void => setIndex( index-1 )}/>}
      <ul className='w-fit mx-auto text-center'>
        {filterQuestions( questions, index, intN ).map( e =>
          <li
            className='py-2'
            key={e.index}>
            <QuestionElement question={e} showAuthor={showAuthors}/>
          </li>
        )}
      </ul>
      {questions.length > intN && <ChevronRightIcon className='h-6 w-6 grow shrink-0 my-auto' onClick={(): void => setIndex( index + 1 )}/> }
    </div>
  )
}

const BestOfNPage = (): JSX.Element => Pageify( { child: BestOfNComponent } )

export default BestOfNPage

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'questions'] )
  }
} )

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Array( 10 ).fill( 1 ).map( ( _,i ) => i ).map( e => ( { params: { n: `${e}` } } ) ),
    fallback: false
  }
}
