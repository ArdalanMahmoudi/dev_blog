import z from "zod";

export const loginUserSchema = z.object({
  email: z.string().toLowerCase().email(),
  password: z.string(),
});

export const verifyUserSchema = z.object({
  email: z.string().toLowerCase().email(),
  password: z.string().min(8),
});

// ------------Posts---------------
export const listPostQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

// ------------AdminPosts----------
export const createPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  published: z.boolean().optional(),
  categoryId: z.number().int().positive(),
});

export const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    .optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  categoryId: z.number().int().positive().optional(),
  published: z.boolean().optional(),
});

// ------------Admin-Category------------
export const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    .optional(),
});
