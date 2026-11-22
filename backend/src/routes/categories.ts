import { Router } from "express";
import { getCategoryBySlug, listCategories } from "../queries/categories";
import { listPublishedPostsByCategoryId } from "../queries/posts";

const router = Router()

router.get("/", async(req,res) => {
    const categories = await listCategories()
    res.json(categories)
})
router.get("/:slug", async(req,res) => {
    const slug = req.params.slug
    const category = await getCategoryBySlug(slug)
    if (!category) {
        res.status(404).json({error:"Category not found!"})
        return
    }
    const posts = await listPublishedPostsByCategoryId(category.id)
    res.json(posts)
})

export default router