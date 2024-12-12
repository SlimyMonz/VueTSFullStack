import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { type AuthRouter, type UserRouter } from '../../proj.server/src/server';
//     👆 **type-only** import

export const getToken = () => sessionStorage.getItem("token") ?? "";

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpcUserRouter = createTRPCClient<UserRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      headers() {
        return {
          Authorization: getToken(),
        };
      },
    }),
  ],
});

export const trpcAuthRouter = createTRPCClient<AuthRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    })
  ]
})