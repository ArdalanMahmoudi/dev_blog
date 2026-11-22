import { db } from "../prisma/db";

export async function listPublishedPosts() {
  return await db.orm.public.Post.where({ published: true })
    .orderBy((p) => p.publishedAt.desc())
    .include("category")
    .all();
}

export async function getPublishedPostBySlug(slug: string) {
  return await db.orm.public.Post.where({ slug, published: true })
    .include("category")
    .first();
}

export async function listPublishedPostsByCategoryId(categoryId: number) {
  return await db.orm.public.Post.where({ categoryId, published: true }).all();
}
