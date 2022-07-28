const express = require("express");
const Posts = require("../schemas/post.js");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is root page!");
});


// 게시글 조회 with GET ('/api/posts')
router.get("/posts", async (req, res) => {

    const dataAll = await Posts.find().sort({ createdAt: -1 });


    const data = [];
    for (let i = 0; i < dataAll.length; i++) {
        data.push({
            postId: dataAll[i]._id.toString(),
            user: dataAll[i].user,
            title: dataAll[i].title,
            createdAt: dataAll[i].createdAt,
        });
    }

    res.json({ data });
});


// 게시글 상세조회 with GET ('/api/posts/:_postId')
router.get("/posts/:_postsId", async (req, res) => {

    const { _postsId } = req.params;


    const thisPost = await Posts.find({ _id: (_postsId) });


    if (!thisPost.length) {
        return res.json({ message: "해당 게시글이 없습니다." });
    }


    const posts = await Posts.find();
    const filteredPosts = posts.filter((e) => e["_id"].toString() === _postsId);
    const data = [
        {
            postsId: filteredPosts[0]._id.toString(),
            user: filteredPosts[0].user,
            title: filteredPosts[0].title,
            content: filteredPosts[0].content,
            createdAt: filteredPosts[0].createdAt,
        },
    ];


    res.json({ data });
});

//     const [detail] = await Posts.find({ postsId: Number(postsId) });

//     res.json({ detail });
// });

// router.post("/posts/:postsId/comment", async (req, res) => {
//     const { postsId } = req.params;
//     const { quantity } = req.body;

//     const existsComment = await Comment.find({ postsId: Number(postsId) });
//     if (existsComment.length) {
//         return res.status(400).json({ sucess: false, errorMessage: "댓글내용을 입력해주세요!" });
//     }
//     await Comment.create({ postsId: Number(postsId), quantity });
//     res.json({ success: true })
// });




// 게시글 작성 with POST ('/api/posts'
router.post("/posts", async (req, res) => {
    const { user, title, content, password } = req.body;
    const createdPosts = await Posts.create({ user, title, content, password, createdAt: new Date() });

    res.json({ Message: "게시글을 생성 하였습니다." });
});

// 게시글 수정 with PUT ('/api/posts/:_postId')
router.put("/posts/:postsId", async (req, res) => {

    const { _postsId } = req.params;

    const { password, title, content } = req.body;


    const thisPost = await Posts.find({ _id: (_postsId) });


    if (!thisPost.length) {
        return res.json({ message: "해당 게시글이 없습니다." });
    }


    await Posts.updateOne(
        {
            _id: (_postsId),

        },
        {
            $set: {

                password: password,
                title: title,
                content: content,
            },
        }
    );

    res.json({ message: "게시글을 수정하였습니다." });
});

//게시글 삭제 with DELETE ('/api/posts/:_postId')
router.delete("/posts/:_postsId", async (req, res) => {

    const { _postsId } = req.params;


    const { password } = req.body;


    const thisPost = await Posts.find({ _id: _postsId });

    if (!thisPost.length) {
        return res.json({ message: "해당 게시글이 없습니다." });
    }



    const db_password = thisPost[0]["password"];


    if (password != db_password) {
        res.json({ message: "패스워드가 일치하지 않습니다." });


    } else {
        await Posts.deleteOne({
            _id: (_postsId),
        });


        res.json({ message: "게시글을 삭제하였습니다." });
    }
});
module.exports = router;