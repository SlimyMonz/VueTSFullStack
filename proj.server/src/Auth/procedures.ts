import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "./context";
import { generateAndEncodeJwtToken } from "./jwt";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  const token = ctx.token;

  // If context token is valid/truthy, proceed to the next step
  if (!!token) {
    // Can add authentication step here. (IE: Database check for info.)

    // Refresh the cookies
    const encodedToken = generateAndEncodeJwtToken(token);
    ctx.res.cookie("token", encodedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Has to be set to lax for cross-origin requests.
      maxAge: 3600000, // Milliseconds
      path: "/",
    });
    ctx.res.cookie("timeout", "", {
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
    });

    console.log("TRPC CTX: Token exists.");
    return opts.next({
      ctx: {
        req: ctx.req,
        res: ctx.res,
        token: ctx.token,
      },
    });
  }
  console.log("TRPC CTX: Token is invalid.");
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "TRPC CTX: You must be logged in to access this resource",
  });
});
