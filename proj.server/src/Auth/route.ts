
import { generateAndEncodeJwtToken } from "./jwt";
import { publicProcedure, router } from "../API/trpc";
import { z } from "zod";
import { LoginData } from "../Models/zodTypes";

const getJwt = publicProcedure
    .input(LoginData)
    .query(async ({input}) => {
        const { username } = input;
        generateAndEncodeJwtToken(username);
});

export const authRouter = router({
    getJwt: getJwt
});