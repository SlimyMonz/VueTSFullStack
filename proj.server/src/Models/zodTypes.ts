import { z } from "zod";

export const userNameSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name cannot be empty').max(100, 'Name is too long'),
  });

export type userNameType = z.infer<typeof userNameSchema>;