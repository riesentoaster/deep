import type { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BestOfN } from '../../components/BestOfN'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { NoQuestionsLeft } from '../../components/NoQuestionsLeft'
import { Pageify, PageifyComponent } from '../../helpers/pageify'

const NComponent: PageifyComponent = ( { questions, showAuthors } ) => {
  const { n } = useRouter().query
  const { t } = useTranslation( 'common' )

  return ( !n || Array.isArray( n ) ) ?
    <p className='color-red-400'>{t( 'urlInvalid' )}</p> :
    Number.parseInt( n ) === 0 ?
      <NoQuestionsLeft/> :
      <BestOfN questions={questions} showAuthors={showAuthors} n={Number.parseInt( n )}/>
}

const BestOfNPage = (): JSX.Element => Pageify( { child: NComponent } )

export default BestOfNPage

export const getStaticProps: GetStaticProps = async ( { locale } ) => ( {
  props: {
    ...await serverSideTranslations( locale || 'en', ['common', 'questions'] )
  }
} )

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:[{ params: { n: '1' } }, { params: { n: '3' } }, { params: { n: '5' } }],
    fallback: 'blocking'
  }
}
