export { getStaticProps, getStaticPaths } from 'i18next-ssg/Redirect'
import { useRootPathRedirect } from 'i18next-ssg'

export default function Page(): JSX.Element {
  useRootPathRedirect()
  return <div>Redirecting...</div>
}
