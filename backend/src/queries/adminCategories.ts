import { db } from "../prisma/db";
import type router from "../routes/posts";


interface NewCategory {
    name:string,
    slug:string
}

export async function listAllCategories() {
  return await db.orm.public.Category.include("posts").all();
}

export async function findCategoryById(id:number) {
    return await db.orm.public.Category.where({id}).first()
}

export async function createCategory(input:NewCategory) {
    return await db.orm.public.Category.create({
        name:input.name,
        slug:input.slug
    })
}

export async function updateCategory(id:number,input:NewCategory) {
    return await db.orm.public.Category.where({id}).update({
        name:input.name,
        slug:input.slug,
    })
}

export async function deleteCategory(id:number) {
    return await db.orm.public.Category.where({id}).delete()
}

