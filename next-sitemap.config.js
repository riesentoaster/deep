/* eslint-disable @typescript-eslint/explicit-function-return-type */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://deep.valentinhuber.me',
  generateRobotsTxt: true,
  additionalPaths: async ( config ) => [await config.transform( config, '/api' )]
}

