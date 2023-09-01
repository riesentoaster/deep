/* eslint-disable @typescript-eslint/explicit-function-return-type */
const wwp = require( 'workbox-webpack-plugin' )
const { i18n } = require( './next-i18next.config' )

const pages = [ '/', '/choose-from/1', '/choose-from/3', '/choose-from/5', '/stats']
const translatedPages = [...pages, ...pages.map( e => '/de' + e ), ...pages.map( e => '/en' + e )]
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    if ( process.env.NODE_ENV !== 'development' )
      config.plugins.push( new wwp.GenerateSW( {
        additionalManifestEntries: translatedPages.map( e => ( { url: e, revision: new Date().toISOString() } ) ),
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 1e9,
        swDest: '../public/service-worker.js',
        ignoreURLParametersMatching: [/.*/],
      } ) )
    return config
  },
  env: {

    NEXT_PUBLIC_I18N: i18n,
  }
}
module.exports = nextConfig

