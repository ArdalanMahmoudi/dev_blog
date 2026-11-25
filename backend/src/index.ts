import express from "express";
import "dotenv/config"
import postsRouter from "./routes/posts";
import categoriesRouter from "./routes/categories";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import adminPosts from "./routes/adminPosts";
import adminCategories from "./routes/adminCategories"

const app = express();
app.use(express.json());

app.use("/posts", postsRouter)
app.use("/categories", categoriesRouter)
app.use("/auth", loginRouter)
app.use("/auth", registerRouter)
app.use("/admin/posts", adminPosts)
app.use("/admin/category", adminCategories)

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/v", (req, res) => {
  res.json({ project: "dev-blog", version: 1 });
});



const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
