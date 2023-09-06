// import { Ellipsis } from './Ellipsis'
import { useTranslation } from 'react-i18next'
import { NavLink, useSearchParams } from 'react-router-dom'
import { Ellipsis } from '../shared/Ellipsis'

const links = {
  'allQuestions': '/',
  'randomQuestion': '/choose-from/1',
  'chooseFrom3': '/choose-from/3',
  'chooseFrom5': '/choose-from/5',
  'stats': '/stats',
}

export const Menu = (): JSX.Element => {
  const { t } = useTranslation( 'common', { keyPrefix: 'header.links' } )
  const [searchParams,] = useSearchParams()

  return (
    <div className='text-center py-2'>
      <h2>{t( 'mode' )}</h2>
      {
        Object.entries( links ).map( ( [text, href] ) =>
          (
            <NavLink key={href} to={href + '?' + searchParams.toString()} >
              {
                ( { isActive, isPending } ): JSX.Element =>
                  isActive || isPending ?
                    ( <Ellipsis className='mx-auto'><p>{t( text )}</p></Ellipsis> ) :
                    ( <p>{t( text )}</p> )
              }
            </NavLink>
          )
        )
      }
    </div>
  )
}
