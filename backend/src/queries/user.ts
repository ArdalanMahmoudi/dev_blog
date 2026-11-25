import { db } from "../prisma/db";

export async function findUserByEmail(email:string) {
    return await db.orm.public.User.where({email}).first()
}

export async function createUser(email:string,password:string) {
    return await db.orm.public.User.create({email,password})
}