import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { initTRPC } from "@trpc/server";
import { userRouter} from "./API/routes";
import { authRouter } from "./Auth/route";
import { createContext } from "./Auth/context";
import cors from "cors";

// Load environment variables from .env file earliest
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.SERVER_PORT || 3000;

// Initialize tRPC
const t = initTRPC.create();
// Merge routers
const appRouter = t.router({
  user: userRouter,
  auth: authRouter,
});

const server = createHTTPServer({
  // context allows for reading ctx
  createContext,
  middleware: cors({credentials: true, origin: true}),
  router: appRouter,
  
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// used by Client TRPC
export type AppRouter = typeof appRouter;