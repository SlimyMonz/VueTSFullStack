import { generateAndEncodeJwtToken } from "./jwt";
import { publicProcedure, router } from "../trpc";
import { LoginData } from "../Models/zodTypes";

const login = publicProcedure
    .input(LoginData)
    .query(async ({ input, ctx }) => {
        const { username } = input;
        const token = generateAndEncodeJwtToken(username);
        
        // Set the JWT in a cookie (you can customize the cookie options like expiration time)
        if (ctx.res) {
            ctx.res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600, // Seconds
                path: '/',
            });
        } else {
            // Handle the case when `ctx.res` is undefined, maybe log the error or return an error message
            throw new Error('Response object is not available in context');
        }

        return { message: 'JWT set in cookie' }; // Optional confirmation message
    });

export const authRouter = router({
    login: login
});