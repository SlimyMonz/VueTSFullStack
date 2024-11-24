import { z } from "zod";
import { UserService as service } from "../Services/UserService";
import { publicProcedure, router } from "../trpc";
import { userNameSchema } from "../Models/zodTypes";


const userList = publicProcedure
    .query(async () => {
        const users = await service.getManyUsers();
        return users;
});

const userById = publicProcedure
    .input(z.string())
    .query(async ({input}) => {
        const user = await service.getUserById(input);
        return user;
});

const userCreate = publicProcedure
// example of where zodTypes models can be used
    .input(userNameSchema)
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
