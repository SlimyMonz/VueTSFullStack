import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "./Auth/context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;

  // If ctx.jwt is valid/truthy, proceed to the next step
  if (!!ctx.token) {
    return opts.next({
      ctx: {
        req: ctx.req,
        res: ctx.res,
      },
    });
  }

  // Check if ctx.jwt is null or undefined and throw an unauthorized error
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "You must be logged in to access this resource",
  });
});
