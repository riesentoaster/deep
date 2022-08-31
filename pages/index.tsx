import type { NextPage, GetStaticProps } from 'next'
import { useState } from 'react'
import { Filters } from '../components/Filters'
import { TriStateSwitchState } from '../components/TriStateSwitch'
import { Question, questions } from '../public/questions'
import { LanguageSettings } from '../components/LanguageSettings'
import tags from '../public/tags.json'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home: NextPage = () => {
  const { t: t_common } = useTranslation( 'common' )
  const { t: t_questions } = useTranslation( 'questions' )
  const [tagStates, setTagStates] = useState<TriStateSwitchState[]>( tags.map( e => e ).fill( 'IGNORE' ) as TriStateSwitchState[] )
  const [deepnessLower,setDeepnessLower] = useState( 1 )
  const [deepnessUpper,setDeepnessUpper] = useState( 10 )

  return (
    <>
      <main>
        <Filters
          tags={tags}
          tagStates={tagStates}
          setTagStates={setTagStates}
          minDeepness={deepnessLower}
          setMinDeepness={setDeepnessLower}
          maxDeepness={deepnessUpper}
          setMaxDeepness={setDeepnessUpper }
        />
        <hr />
        <h2 className='text-center'>{t_common( 'questions' )}</h2>
        <ul>
          {questions.filter( reduceFilter(
            tags.map( ( e, i ) => getFilter( tagStates[i], e ) ) ) )
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

type GeneralFilter = ( ...e: any[] ) => boolean

const reduceFilter = ( filters: GeneralFilter[] ): GeneralFilter =>
  filters.reduce( ( acc, cur ): ( ...e: any[] ) => boolean =>
    ( ...params ) => acc( ...params ) && cur( ...params ) )

const getFilter = ( state: TriStateSwitchState, tag: string ): ( question: Question ) => boolean => {
  switch ( state ) {
    case 'IGNORE':
      return (): boolean => true
    case 'REQUIRE':
      return ( question: Question ): boolean => !!question.tags && question.tags?.includes( tag )
    case 'PROHIBIT':
      return ( question: Question ): boolean => !question.tags || !question.tags.includes( tag )
  }
}


export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'tags', 'questions'] ),
  },
} )
