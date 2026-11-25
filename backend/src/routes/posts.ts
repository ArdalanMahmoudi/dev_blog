import { Router } from "express";
import {
  countPublishedPosts,
  getPublishedPostBySlug,
  listPublishedPosts,
} from "../queries/posts";
import { listPostQuerySchema } from "../schema";

const router = Router();

router.get("/", async (req, res) => {
  const parsed = listPostQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid query" });
    return;
  }
  const [posts, total] = await Promise.all([
    listPublishedPosts(parsed.data.page, parsed.data.limit),
    (await countPublishedPosts()).total,
  ]);
  res.json({
    data: posts,
    page: parsed.data.page,
    limit: parsed.data.limit,
    total
  });
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
