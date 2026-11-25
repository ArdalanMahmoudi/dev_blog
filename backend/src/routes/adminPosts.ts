import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { requireAdmin } from "../middlewares/requireAdmin";
import {
  createPost,
  deletePost,
  findPostById,
  listAllPosts,
  updatePost,
} from "../queries/adminPosts";
import { validate } from "../middlewares/validateMiddleware";
import { createPostSchema, updatePostSchema } from "../schema";

const router = Router();

router.use(auth, requireAdmin);

router.get("/", async (req, res) => {
  const listPosts = await listAllPosts();
  res.json(listPosts);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const post = await findPostById(id);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(post);
});

router.post("/", validate(createPostSchema), async (req, res) => {
  const { title, slug, categoryId, content, excerpt, published } = req.body;

  try {
    const result = await createPost({
      title,
      slug,
      categoryId,
      content,
      excerpt,
      published,
      authorId: Number(res.locals.userId),
    });
    res.status(201).json({ message: "Create New Post", data: result });
  } catch (error: any) {
    if (error.sqlState === "23505") {
      res.status(409).json({ error: "already slug exist" });
      return;
    }
    if (error.sqlState === "23503") {
      res.status(409).json({ error: "ctegory not found" });
      return;
    }
    throw error;
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await deletePost(id);
  if (!result) {
    res.status(404).json({ error: "Post not found!" });
    return;
  }
  res.status(204).send();
});

router.patch("/:id", validate(updatePostSchema), async (req, res) => {
  const id = Number(req.params.id);

  const { title, slug, content, excerpt, categoryId, published } = req.body;

  const result = await updatePost(id, {
    title,
    slug,
    content,
    excerpt,
    categoryId,
    published,
  });
  if (!result) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(result);
});

export default router;
