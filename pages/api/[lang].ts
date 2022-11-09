import { questions } from '../../public/questions'
import fs from 'fs'
import { apiify } from '../../helpers/apiify'
import path from 'path'

const locales = require( '../../next-i18next.config' ).i18n.locales

export default apiify(
  ( req, res ): void => {
    if ( !req.query.lang ||
      Array.isArray( req.query.lang ) ||
      !locales.includes( req.query.lang ) ) {
      res.status( 404 ).json( { message: 'Language not found.' } )
    }
    try {
      const dir = path.resolve( './public',`locales/${req.query.lang}` )
      const translations = {
        questions: JSON.parse( '' + fs.readFileSync( path.join( dir, 'questions.json' ) ) ),
        tags: JSON.parse( '' + fs.readFileSync( path.join( dir, 'tags.json' ) ) )
      }
      res.json( { questions: questions, translations } )
    } catch ( e ) {
      res.status( 500 ).json( { message: 'Unknown error. Please report this issue to the maintainers.' } )
    }
  }
)
