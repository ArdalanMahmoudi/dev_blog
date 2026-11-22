import { Router } from "express";
import { getPublishedPostBySlug, listPublishedPosts } from "../queries/posts";

const router = Router();

router.get("/", async (req, res) => {
  const posts = await listPublishedPosts();
  res.json(posts);
});

router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    res.status(404).json({ error: "Post not found!" });
    return;
  }
  res.json(post);
});

export default router;
