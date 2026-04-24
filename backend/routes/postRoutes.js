const express = require(`express`)
const router = express.Router()
const post = require(`../controllers/postControllers`)
const  { authMiddleware } = require("../middlewares/auth")

// 🔥 ORDEM CORRETA
router.get("/", post.getPosts);

router.post("/", authMiddleware, post.createPost);

// 🔥 PUT/DELETE PRIMEIRO
router.put("/:id", authMiddleware, post.updatePost);
router.delete("/:id", authMiddleware, post.deletePost);

// 🔥 GENÉRICO POR ÚLTIMO
router.get("/:userId", post.getPostsByUser);

module.exports = router;