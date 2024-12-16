import { z } from "zod";
import { UserService as service } from "../Services/UserService";
import { privateProcedure, router } from "../trpc";
import { UserData } from "../Models/zodTypes";


const userList = privateProcedure
    .query(async () => {
        const users = await service.getManyUsers();
        return users;
});

const userById = privateProcedure
    .input(z.string())
    // .use(function) can be used for injecting middleware
    .query(async ({input}) => {
        const user = await service.getUserById(input);
        return user;
});

const user = privateProcedure
// example of where zodTypes models can be used
    .input(UserData)
    .mutation(async ({input}) => {
        const user = await service.createUser(input);
        return user;
  });

// export the endpoints to be used in server.ts
export const userRouter = router({
  userList: userList,
  userById: userById,
  user: user,
});
