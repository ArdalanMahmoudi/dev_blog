import type z from "zod";
import { db } from "../prisma/db";
import type { updatePostSchema } from "../schema";

interface NewPost {
  title: string;
  slug: string;
  categoryId: number;
  authorId: number;
  content: string;
  excerpt?: string;
  published?: boolean;
}

type UpdatePost = z.infer<typeof updatePostSchema>;

export async function listAllPosts() {
  return await db.orm.public.Post.orderBy((p) => p.createdAt.desc()).include("category").all();
}

export async function findPostById(id:number) {
  return await db.orm.public.Post.where({id}).first()
}

export async function createPost(input: NewPost) {
  const published = input.published ?? false;

  return await db.orm.public.Post.create({
    title: input.title,
    slug: input.slug,
    categoryId: input.categoryId,
    content: input.content,
    authorId: input.authorId,
    published,
    ...(input.excerpt !== undefined && { excerpt: input.excerpt }),
    ...(published && { publishedAt: new Date() }),
  });
}

export async function deletePost(id: number) {
  return await db.orm.public.Post.where({ id }).delete();
}

export async function updatePost(id: number, input: UpdatePost) {
  const fields = ["title", "slug", "content", "excerpt", "categoryId"] as const;
  return await db.transaction(async (tx) => {
    const post = await tx.orm.public.Post.where({ id }).first();
    if (!post) return null;
    const data: Record<string, unknown> = {};

    for (const key of fields) {
      if (input[key] !== undefined) {
        // published
        data[key] = input[key];
      }
    }
    if (input.published !== undefined) {
      data.published = input.published;
      if (input.published === true && !post.publishedAt) {
        data.publishedAt = new Date();
      }
    }

    return await tx.orm.public.Post.where({ id }).update(data);
  });
}
