import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors( { methods: ['GET'] } )

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
): Promise<any> {
  return new Promise( ( resolve, reject ) => {
    fn( req, res, ( result: any ) => {
      if ( result instanceof Error ) {
        return reject( result )
      }
      return resolve( result )
    } )
  } )
}

export const apiify = ( doSomething: ( req: NextApiRequest, res: NextApiResponse ) => Promise<void>|void ): ( req: NextApiRequest, res: NextApiResponse ) => Promise<void> =>
  async ( req: NextApiRequest, res: NextApiResponse ): Promise<void> => {
    // Run the middleware
    await runMiddleware( req, res, cors )
    return doSomething( req, res )
  }
