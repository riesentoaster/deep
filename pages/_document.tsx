import { Html, Head, NextScript, Main } from 'next/document'

const Document = (): JSX.Element => {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#010C1E"/>
        <meta name="description" content="Getting people to talk about the stuff that really matters"/>
        <link rel="icon" href="favicon.svg"/>
        <link rel="mask-icon" href="mask-icon.svg" color="#010C1E"/>
        <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
        <link rel="manifest" href="manifest.json"/>
      </Head>
      <Main/>
      <NextScript />
    </Html>
  )
}

export default Document
