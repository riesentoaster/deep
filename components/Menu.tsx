import Link from 'next/link'
import { Ellipsis } from './Ellipsis'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const links = {
  'allQuestions': '/',
  'randomQuestion': '/choose-from/1',
  'chooseFrom3': '/choose-from/3',
  'chooseFrom5': '/choose-from/5',
  'stats': '/stats',
}

export const Menu = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation( 'common', { keyPrefix: 'links' } )

  return (
    <div className='text-center py-2'>
      <h2>{t( 'menu' )}</h2>
      {
        Object.entries( links ).map( ( [text, href] ) => (
          <Link key={text} href={href}>
            {
              router.asPath === href ?
                <Ellipsis className='mx-auto'><p>{t( text )}</p></Ellipsis>:
                <p>{t( text )}</p>
            }
          </Link> ) )
      }
    </div>
  )
}
