import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing token!" });
    return;
  }

  const token = header?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Missing token!" });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ["HS256"],
    }) as jwt.JwtPayload;
    res.locals.userId = payload.sub;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token!" });
  }
}
