import { z } from "zod";

export const UserData = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name cannot be empty').max(100, 'Name is too long'),
  });

export type UserType = z.infer<typeof UserData>;