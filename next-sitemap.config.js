/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://deep.valentinhuber.me',
  generateRobotsTxt: true,
  exclude: ['api/*']
}

