import { Router } from "express";
import { loginUserSchema } from "../schema";
import { validate } from "../middlewares/validateMiddleware";
import { findUserByEmail } from "../queries/user";
import { verifyPassword } from "../utils/password";
import jwt from "jsonwebtoken"

const router = Router();

router.post("/login", validate(loginUserSchema), async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.password))) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const token  = jwt.sign({sub:String(user.id)}, process.env.JWT_SECRET!,{
    expiresIn:"15m"
  })
  res.status(200).json({token})
});

export default router;
