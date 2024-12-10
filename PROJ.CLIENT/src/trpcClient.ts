import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { UserRouter } from '../../proj.server/src/server';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<UserRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

export default trpc;