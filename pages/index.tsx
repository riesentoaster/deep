import { Question } from '../components/Question'
import { NoQuestionsLeft } from '../components/NoQuestionsLeft'
import { Pageify } from '../helpers/pageify'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = (): JSX.Element => Pageify( { child:  ( { questions, showAuthors } ) => (
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
) } )

export default Home

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'questions'] )
  }
} )
