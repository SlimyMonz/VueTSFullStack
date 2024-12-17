import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { type AppRouter } from '../../proj.server/src/server';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc', 
      fetch: (input, init) => {
        return fetch(input, {
          ...init,
          credentials: 'include', // This ensures cookies are sent, including HttpOnly cookies
        });
      },
    }),
  ],
});

export default trpc;