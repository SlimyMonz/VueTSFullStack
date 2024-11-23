import { z } from "zod";
import { UserService as service } from "../Services/UserService";
import { publicProcedure, router } from "../trpc";
import { userNameSchema } from "../Models/zodTypes";


const userList = publicProcedure
    .query(async () => {
        const users = await service.findManyUsers();
        return users;
});

const userById = publicProcedure
    .input(z.string())
    .query(async (opts) => {
        const { input } = opts;
        const user = await service.findUserById(input);
        return user;
});

const userCreate = publicProcedure
// example of where zodTypes models might be used
    .input(userNameSchema)
// "opts" can be replaced by ({ input }) if desired
    .mutation(async ({input}) => {
        const user = await service.createUser(input);
        return user;
  });

// export the routes
export const userRouter = router({
  userList: userList,
  userById: userById,
  userCreate: userCreate,
});
