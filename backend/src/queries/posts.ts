import { db } from "../prisma/db";

export async function listPublishedPosts(page: number, limit: number) {
  const offset = (page - 1) * limit;
  return await db.orm.public.Post.where({ published: true })
    .orderBy((p) => p.publishedAt.desc())
    .limit(limit)
    .offset(offset)
    .include("category")
    .all();
}

export async function countPublishedPosts() {
    return await db.orm.public.Post.where({published:true})
    .aggregate((a) => ({total:a.count()}))
}
export async function getPublishedPostBySlug(slug: string) {
  return await db.orm.public.Post.where({ slug, published: true })
    .include("category")
    .first();
}

export async function listPublishedPostsByCategoryId(categoryId: number) {
  return await db.orm.public.Post.where({ categoryId, published: true }).all();
}
