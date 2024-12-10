
import { generateAndEncodeJwtToken } from "./jwt";
import { publicProcedure, router } from "../API/trpc";
import { z } from "zod";

const getJwt = publicProcedure
    .input(z.object({
        username: z.string()
    }))
    .query(async ({input}) => {
        const { username } = input;
        generateAndEncodeJwtToken(username);
});

export const authRouter = router({
    getJwt: getJwt
});