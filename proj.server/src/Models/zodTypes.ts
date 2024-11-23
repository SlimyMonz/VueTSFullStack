import { z } from "zod";


export const userName = z.object({ name: z.string() })