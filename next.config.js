/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { i18n } = require( './next-i18next.config' )
const wwp = require( 'workbox-webpack-plugin' )

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  webpack: config => {
    config.plugins.push( new wwp.GenerateSW( {
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 1e9,
      swDest: '../public/service-worker.js',
      ignoreURLParametersMatching: [/.*/],
    } ) )
    return config
  },
}
module.exports = nextConfig

