import { Ellipsis } from './Ellipsis'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { QUERY_INDEX } from './filters/Filters'
import { useEffect } from 'react'

const links = {
  'allQuestions': '/',
  'randomQuestion': '/choose-from/1',
  'chooseFrom3': '/choose-from/3',
  'chooseFrom5': '/choose-from/5',
  'stats': '/stats',
}

export const Menu = (): JSX.Element => {
  const { asPath, query, push, prefetch } = useRouter()
  const { t } = useTranslation( 'common', { keyPrefix: 'links' } )

  useEffect( () => {
    Object.entries( links ).forEach( pathname => prefetch( `${pathname}?${query}` ) )
  }, [prefetch, query] )

  return (
    <div className='text-center py-2'>
      <h2>{t( 'menu' )}</h2>
      {
        Object.entries( links ).map( ( [text, href] ) => (
          <a href={href} key={href} onClick={( event ): void => {
            event.preventDefault()
            const filter = query[QUERY_INDEX]
            push( { pathname: href, query: filter ? { [QUERY_INDEX]: filter } : {} } )
          } }>
            {
              asPath.split( '?' )[0] === href ?
                <Ellipsis className='mx-auto'><p>{t( text )}</p></Ellipsis> :
                <p>{t( text )}</p>
            }
          </a>
        ) )
      }
    </div>
  )
}
