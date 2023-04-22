import { useRouter } from 'next/router'
const localeInLocale: Record<string, string> = {
  de: 'Deutsch',
  en: 'English'
}

export const LanguageSettings = (): JSX.Element => {
  const router = useRouter()
  const { pathname, asPath, query, locales, locale } = router
  return (
    <div className='flex flex-row border rounded-full m-5'>
      {locales?.sort().map( e =>
        <button
          className={`px-5 rounded-full ${locale === e && 'bg-accentColorDarkBlue border rounded-full'}`}
          key={e}
          onClick={(): Promise<boolean> => router.push( { pathname, query }, asPath, { locale: e } )}>
          {localeInLocale[e]}
        </button>
      )}
    </div>
  )
}
