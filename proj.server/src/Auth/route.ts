import { generateAndEncodeJwtToken } from "./jwt";
import { publicProcedure, router } from "../trpc";
import { LoginData } from "../Models/zodTypes";

// Startup dotenv
import dotenv from "dotenv";
dotenv.config();

const login = publicProcedure
    .input(LoginData)
    .query(async ({ input, ctx }) => {
        const { username } = input;
        const jwtToken = generateAndEncodeJwtToken(username);
        
        // Set the JWT in a cookie (you can customize the cookie options like expiration time)
        if (ctx.res) {
            ctx.res.cookie('token', jwtToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict', // Has to be set to lax for cross-origin requests.
                maxAge: 3600, // Seconds
                path: '/',
            });
            // this can be used to detect the age of the secure cookie without having the info available
            ctx.res.cookie('timeout', '', {
                secure: false,
                sameSite: 'strict',
                maxAge: 3600
            });
        } else {
            // Handle the case when `ctx.res` is undefined, maybe log the error or return an error message
            throw new Error('Response object is not available in context');
        }
        console.log('JWT set in cookie.');
        return { message: 'JWT set in cookie' }; // Optional confirmation message
    });

export const authRouter = router({
    login: login
});