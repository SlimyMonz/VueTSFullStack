import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { userRouter} from "./API/routes";
import { authRouter } from "./Auth/route";
import { createContext } from "./Auth/context";
import cors from "cors";

// Load environment variables from .env file earliest
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.SERVER_PORT || 3000;

const server = createHTTPServer({
  // context allows for reading ctx
  createContext,
  middleware: cors({credentials: true, origin: true}),
  router: userRouter,
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// used by Client TRPC
export type UserRouter = typeof userRouter;
export type AuthRouter = typeof authRouter;