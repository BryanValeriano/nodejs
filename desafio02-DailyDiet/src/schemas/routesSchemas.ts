import { z } from 'zod';

export const postMealBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  isDiet: z.boolean(),
});

export const postUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
});
