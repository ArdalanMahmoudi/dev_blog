import type { NextFunction, Request, Response } from "express";
import { db } from "../prisma/db";

export async function requireAdmin(req:Request,res:Response,next:NextFunction) {
    const userId = Number(res.locals.userId)
    const user = await db.orm.public.User.where({id:userId}).first()

    if (!user || !user.isAdmin ) {
        res.status(403).json({error:"Forbidden"})
        return
    }
    next()
}