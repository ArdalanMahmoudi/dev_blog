import express from "express";
import "dotenv/config"
import postsRouter from "./routes/posts";
import categoriesRouter from "./routes/categories";

const app = express();
app.use(express.json());

app.use("/posts", postsRouter)
app.use("/categories", categoriesRouter)

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
