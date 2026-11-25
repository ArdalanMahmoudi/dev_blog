import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { requireAdmin } from "../middlewares/requireAdmin";
import {
  createCategory,
  deleteCategory,
  findCategoryById,
  listAllCategories,
  updateCategory,
} from "../queries/adminCategories";
import { validate } from "../middlewares/validateMiddleware";
import { createCategorySchema, updateCategorySchema } from "../schema";

const router = Router();

router.use(auth, requireAdmin);

router.get("/", async (req, res) => {
  const listCategory = await listAllCategories();
  if (!listCategory) {
    res.json({ error: "Categories not exist!" });
    return;
  }
  res.json(listCategory);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const category = await findCategoryById(id);
  if (!category) {
    res.status(404).json({ error: "Category not Found!" });
    return;
  }
  res.json(category);
});

router.post("/", validate(createCategorySchema), async (req, res) => {
  const { name, slug } = req.body;
  try {
    const result = await createCategory({ name, slug });
    res.status(201).json({ message: "create new category", data: result });
  } catch (error: any) {
    if (error.sqlState === "23505") {
      res.status(409).json({ error: "already slug exist" });
      return;
    }
    throw error;
  }
});

router.patch("/:id", validate(updateCategorySchema), async (req, res) => {
  const id = Number(req.params.id);
  const { name, slug } = req.body;
  try {
    const result = await updateCategory(id, { name, slug });
    if (!result) {
      res.status(404).json({ error: "Category not found!" });
      return;
    }
    res.json(result);
  } catch (error: any) {
    if (error.sqlState === "23505") {
      res.status(409).json({ error: "already slug exist" });
      return;
    }
    throw error;
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await deleteCategory(id);

    if (!result) {
      res.status(404).json({ error: "Category not found!" });
      return;
    }
    res.status(204).send();
  } catch (error: any) {
    if (error.sqlState === "23503") {
      res.status(409).json({ error: "Category still has posts" });
      return;
    }
    throw error;
  }
});

export default router;
