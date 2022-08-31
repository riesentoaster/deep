import { questions } from '../../public/questions'
import fs from 'fs'
import { apiify } from '../../helpers/apiify'
import path from 'path'

export default apiify(
  ( req, res ): void => {
    const dir = path.resolve( './public',`locales/${req.query.lang}` )
    try {
      const translations = {
        questions: JSON.parse( '' + fs.readFileSync( path.join( dir, 'questions.json' ) ) ),
        tags: JSON.parse( '' + fs.readFileSync( path.join( dir, 'tags.json' ) ) )
      }
      res.json( { questions: questions, translations } )
    } catch ( e ) {
      res.status( 500 ).json( { message: 'Language not found.', details: e } )
    }
  }
)
