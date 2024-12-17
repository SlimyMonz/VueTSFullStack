import { decodeAndVerifyJwtToken } from './jwt';
import * as trpcExpress from '@trpc/server/adapters/express';

// Function to create the context
export async function createContext({ req, res }: trpcExpress.CreateExpressContextOptions) {

  // Function to parse cookies and extract the JWT token
  async function parseCookie() {
    const cookies = req.cookies;  // Directly access cookies from req.cookies (thanks to cookie-parser)
    const jwt = cookies.token;  // Get the JWT token from the cookie

    if (!!jwt) {
      try {
        // Decode and verify the JWT token
        const decodedJwt = await decodeAndVerifyJwtToken(jwt);
        return decodedJwt; 
      } catch (error) {
        console.error('JWT verification failed', error);
        return null;
      }
    }
    return null;  // Return null JWT if no JWT token is found, still want request/result for public procedure (auth). 
  }

  const jwt = await parseCookie();  // Parse and verify the JWT token from cookies
  console.log(jwt);
  return { req, res, token: jwt }; 
}


export type Context = Awaited<ReturnType<typeof createContext>>;
