// express와 이 파일의 router 객체 초기화
const express = require("express");
const router = express.Router();

// '/api/posts' '/api/comments'로 들어오는 건 아래 두 파일 (comments.js, posts.js)에서 처리하겠다는 내용
const postsRouter = require("./posts.js");
const commentsRouter = require("./comments.js");
router.use("/posts", [postsRouter]);
router.use("/comments", [commentsRouter]);

module.exports = router;