import { z } from 'zod';

export const getMealParamsSchema = z.object({
  id: z.string().uuid(),
});

export const postMealBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  isDiet: z.boolean(),
});

export const getUserParamsSchema = z.object({
  id: z.string().uuid(),
});

export const postUserBodySchema = z.object({
  email: z.string(),
});
