import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { userRouter} from "./API/routes";

export type AppRouter = typeof userRouter;

const server = createHTTPServer({
  router: userRouter,
});

server.listen(3000);