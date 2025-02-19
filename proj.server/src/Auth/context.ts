import { decodeAndVerifyJwtToken } from './jwt';
import * as trpcExpress from '@trpc/server/adapters/express';
import Cookies from "cookies";

// Function to create the context
export async function createContext({ req, res }: trpcExpress.CreateExpressContextOptions) {
  const cookies = new Cookies(req, res);
    const token = cookies.get("token");
    if (!token) {
      console.log("createContext(): No token found.");
      return { req, res };
    } else {
      try {
        const decodedJwt = await decodeAndVerifyJwtToken(token);
        console.log('createContext(): JWT verification succeeded.');
        return { req, res, token: decodedJwt};
      } catch(error) {
        console.error('createContext(): JWT verification failed', error);
        return { req, res};
      }
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>;
