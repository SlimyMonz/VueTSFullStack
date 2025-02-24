import { decodeAndVerifyJsonWebToken } from "./jwt";
import * as trpcExpress from "@trpc/server/adapters/express";

// Function to create the context
export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const cookies = req.cookies;
  const token = cookies.token;

  if (!!token) {
    try {
      const decodedToken = await decodeAndVerifyJsonWebToken(token);
      console.log("createContext(): JWT verification succeeded.");
      return { req, res, token: decodedToken };
    } catch (error) {
      console.error("createContext(): JWT verification failed", error);
      return { req, res };
    }
  }
  console.log("createContext(): No token found.");
  return { req, res };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
