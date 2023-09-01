import { Question } from '../../components/Question'
import { NoQuestionsLeft } from '../../components/NoQuestionsLeft'
import { Pageify, PageifyComponent } from '../../helpers/pageify'

import { makeStaticProps, getStaticPaths } from 'i18next-ssg/server'

const HomeComponent: PageifyComponent = ( { questions, showAuthors } ) => (
  questions.length === 0 ?
    <NoQuestionsLeft/> :
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

const Home = (): JSX.Element => Pageify( { child: HomeComponent } )

export default Home

const getStaticProps = makeStaticProps( ['common'] )
export { getStaticPaths, getStaticProps }
