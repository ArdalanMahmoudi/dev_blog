import { Router } from "express";
import { validate } from "../middlewares/validateMiddleware";
import { verifyUserSchema } from "../schema";
import { hashPassword } from "../utils/password";
import { createUser } from "../queries/user";

const router = Router();

router.post("/register", validate(verifyUserSchema), async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    await createUser(email, hashedPassword);
    res.status(201).json({ message: "Signup Successfully!" });
  } catch (error: any) {
    if (error.sqlState === "23505") {
      res.status(409).json({ error: "Email already exist!" });
      return;
    }
    throw error;
  }
});

export default router;
