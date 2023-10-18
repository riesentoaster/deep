// import { Ellipsis } from './Ellipsis'
import { useTranslation } from 'react-i18next'
import { NavLink, useSearchParams } from 'react-router-dom'
import { Ellipsis } from '../generic/Ellipsis'
import { FC, ReactNode } from 'react'

const links = {
  'home': '/',
  'allQuestions': '/all-questions',
  'randomQuestion': '/choose-from/1',
  'chooseFrom3': '/choose-from/3',
  'chooseFrom5': '/choose-from/5',
  'stats': '/stats',
}

export const Mode: FC = () => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.links' } )
  const [ searchParams, ] = useSearchParams()

  return (
    <div>
      <h2>{t( 'mode' )}</h2>
      <ul>
        {
          Object.entries( links ).map( ( [ text, href ] ) =>
            (
              <NavLink key={href} to={href + '?' + searchParams.toString()} >
                {
                  ( { isActive, isPending } ): ReactNode =>
                    isActive || isPending ?
                      ( <Ellipsis className='mx-auto'><li>{t( text )}</li></Ellipsis> ) :
                      ( <li>{t( text )}</li> )
                }
              </NavLink>
            )
          )
        }
      </ul>
    </div>
  )
}
