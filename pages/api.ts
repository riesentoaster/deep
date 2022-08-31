import { apiify } from '../helpers/apiify'

export default apiify( ( req, res ): void => {
  res.json( { 'message': 'Usage: \'/api/[lang]\' for the desired language' } )
} )
