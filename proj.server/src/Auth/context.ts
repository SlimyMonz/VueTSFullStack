import * as trpcNext from '@trpc/server/adapters/next'
import { decodeAndVerifyJwtToken } from './jwt'

export async function createContext({
    req, res
}: trpcNext.CreateNextContextOptions) {

      // Get the route being requested
  const route = req.url;  // e.g., /user/someProcedure, /auth/login, etc.

  // If the route starts with '/auth', we don't need to check for a valid token
  if (route.startsWith('/auth')) {
    return null;  // No user context needed for auth routes (login)
  }

    // Currently, the context only parses the JWT and returns it in an object.
    async function parseHeader() {
        if (req.headers.authorization) {
            const jwt = await decodeAndVerifyJwtToken(
                req.headers.authorization.split(' ')[1]
            );
            return jwt;
        } else {
            return null; // can implement error here if desired; may be redundant since errors will be sent by the decode function anyway.
        }
    }

    const jwt = await parseHeader();
    return {jwt : jwt};
};

export type Context = Awaited<ReturnType<typeof createContext>>;