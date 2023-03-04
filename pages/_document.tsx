import { Html, Head, NextScript } from 'next/document'

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#010C1E"/>
        <link rel="icon" href="favicon.svg"/>
        <link rel="mask-icon" href="mask-icon.svg" color="#010C1E"/>
        <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
        <link rel="manifest" href="manifest.json"/>
      </Head>
      <NextScript />
    </Html>
  )
}
