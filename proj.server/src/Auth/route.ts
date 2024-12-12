
import { generateAndEncodeJwtToken } from "./jwt";
import { publicProcedure, router } from "../API/trpc";
import { LoginData } from "../Models/zodTypes";

const getJwt = publicProcedure
    .input(LoginData)
    .query(async ({input}) => {
        const { username } = input;
        return generateAndEncodeJwtToken(username);
});

export const authRouter = router({
    getJwt: getJwt
});