import { useRouter } from 'next/router'
const localeInLocale: Record<string, string> = {
  de: 'Deutsch',
  en: 'English'
}


export const LanguageSettings = (): JSX.Element => {
  const router = useRouter()
  const { pathname, asPath, query, locales, locale } = router
  return (
    <ul className='flex flex-row ml-auto mr-10 w-min border-2 rounded-full'>
      {locales?.sort().map( e =>
        <li
          className={`px-5 rounded-full ${locale === e && 'bg-accentColorLightBlue'}`}
          key={e}
          onClick={(): Promise<boolean> => router.push( { pathname, query }, asPath, { locale: e } )}>
          {localeInLocale[e]}
        </li>
      )}
    </ul>
  )
}
