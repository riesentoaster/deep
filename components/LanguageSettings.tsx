import { useRouter } from 'next/router'
import { EllipsisSwitch } from './EllipsisSwitch'
const localeInLocale: Record<string, string> = {
  de: 'Deutsch',
  en: 'English'
}

export const LanguageSettings = (): JSX.Element => {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  return (
    <EllipsisSwitch
      elements={localeInLocale}
      state={locale}
      setState={( state: string ): Promise<boolean> => router.push( { pathname, query }, asPath, { locale: state } ) }
    />
  )
}
