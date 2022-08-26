import type { NextPage } from 'next'
import { useState } from 'react'
import { TriStateSwitch, TriStateSwitchState } from '../components/TriStateSwitch'
import { languages, Question, questions } from '../public/questions'

const Home: NextPage = () => {
  const [lang, setLang] = useState( 'de' )

  const tags = questions
    .filter( e => e.tags )
    .map( e => e.tags )
    .flat()
    .filter( ( e,i,a ) => a.indexOf( e ) === i ) as string[]

  const [tagStates, setTagStates] = useState<TriStateSwitchState[]>( tags.map( e => e ).fill( 'IGNORE' ) as TriStateSwitchState[] )

  return (
    <div>
      <header>
        <ul className='flex flex-row' >
          {Object.entries( languages ).map( ( [k,v] ) =>(
            <li
              className={`px-1 border-2 ${lang === k ? 'bg-gray-200': ''}`}
              key={k}
              onClick={(): void => setLang( k )}
            >
              {v}
            </li>
          ) )
          }
        </ul>
      </header>
      <main>
        <h2>Filters</h2>
        {tags.map( ( e,i ) => (
          <TriStateSwitch
            key={e}
            text={e}
            state={tagStates[i]}
            setState={( newState: TriStateSwitchState ): void => {
              const newTagStates = tagStates.map( e => e )
              newTagStates[i] = newState
              setTagStates( newTagStates )
            }}
          /> )
        )}
        <h2>Fragen</h2>
        <ul>
          {questions.filter( reduceFilter(
            tags.map( ( e,i ) => getFilter( tagStates[i], e ) ) ) )
            .map( e => <li key={e.translations[lang]}>{e.translations[lang]}</li> )}
        </ul>
      </main>
    </div>
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
