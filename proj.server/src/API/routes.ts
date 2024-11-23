import { z } from "zod";
import { db } from "../Repository/db";
import { publicProcedure, router } from "../trpc";
import { userName } from "../Models/zodTypes";


const userList = publicProcedure
    .query(async () => {
        const users = await db.user.findMany();
        return users;
});

const userById = publicProcedure
    .input(z.string())
    .query(async (opts) => {
        const { input } = opts;
        const user = await db.user.findById(input);
        return user;
});

const userCreate = publicProcedure
// example of where zodTypes models might be used
    .input(userName)
// "opts" can be replaced by ({ input }) if desired
    .mutation(async (opts) => {
        const { input } = opts;
        const user = await db.user.create(input);
        return user;
  });

// export the routes
export const userRouter = router({
  userList: userList,
  userById: userById,
  userCreate: userCreate,
});
