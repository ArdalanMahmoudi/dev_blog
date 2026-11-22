import { db } from "../prisma/db";

export async function listCategories() {
  return await db.orm.public.Category.all();
}

export async function getCategoryBySlug(slug:string) {
  return await db.orm.public.Category.where({slug}).first();
}

