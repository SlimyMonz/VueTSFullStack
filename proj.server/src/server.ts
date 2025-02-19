import express from "express";
import cors from "cors";

import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cookieParser from 'cookie-parser';

import { userRouter } from "./API/routes";
import { authRouter } from "./Auth/route";
import { Context, createContext } from "./Auth/context";


// Load environment variables from .env file earliest
import dotenv from "dotenv";
dotenv.config();
const port = process.env.SERVER_PORT || 3000;

// Initialize tRPC
const t = initTRPC.context<Context>().create();
// Merge routers
const appRouter = t.router({
  user: userRouter,
  auth: authRouter,
});

// Create Express app
const app = express();

// Middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// Set up tRPC router with Express
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// used by Client TRPC
export type AppRouter = typeof appRouter;
