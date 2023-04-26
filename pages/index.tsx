import { Question } from '../components/Question'
import { NoQuestionsLeft } from '../components/NoQuestionsLeft'
import { Pageify, PageifyComponent } from '../helpers/pageify'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomeComponent: PageifyComponent = ( { questions, showAuthors } ) => {
  console.log( showAuthors )
  return(
    questions.length === 0 ?
      <NoQuestionsLeft/>:
      <ul className='w-fit mx-auto'>
        {questions.map( e =>
          <li
            className='py-2'
            key={e.index}>
            <Question question={e} showAuthor={showAuthors}/>
          </li>
        )}
      </ul>
  )
}

const Home = (): JSX.Element => Pageify( { child: HomeComponent } )

export default Home

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'questions'] )
  }
} )
