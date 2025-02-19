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
        console.log("JWT Decoded: " + decodedJwt);
        return decodedJwt; 
      } catch (error) {
        console.error('JWT verification failed', error);
        return null;
      }
    }
    console.log("createContext.parseCookie(): No JWT found in cookie.")
    return null; 
  }
  const jwt = await parseCookie();
  return { req, res, token: jwt }; 
}


export type Context = Awaited<ReturnType<typeof createContext>>;
