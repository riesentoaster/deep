import { questions } from '../../public/questions'
import fs from 'fs'
import { apiify } from '../../helpers/apiify'


export default apiify(
  ( req, res ): void => {
    try {
      const translations = {
        questions: JSON.parse( '' + fs.readFileSync( `./public/locales/${req.query.lang}/questions.json` ) ),
        tags: JSON.parse( '' + fs.readFileSync( `./public/locales/${req.query.lang}/tags.json` ) )
      }
      res.json( { questions: questions, translations } )
    } catch ( e ) {
      res.status( 500 ).json( { message: 'Language not found.', details: e } )
    }
  }
)
