const express = require("express");
const Posts = require("../schemas/post")
const Comment = require("../schemas/comment");
const router = express.Router();

// router.get("/comment", async (req, res) => {
//     const comment = await Comment.find();
//     const postsIds = comment.map((comment) => comment.postsId);

//     const posts = await Posts.find({ postsId: postsIds })




//     res.json({
//         comment:comment.map((comment) =>{
//             return {
//                 quantity:comment.quantity,
//                 comment:posts.find((item) =>{
//                     return item.postsId ===comment.postsId;
//                 }),
//             };
//         })
//     })
// });

// 댓글 작성 with POST ('/api/comments/_postId')
router.post("/comments/:_postId", async (req, res) => {

    const { _postId } = req.params;


    const { user, password, content } = req.body;


    const posts = await Posts.find({ _id: _postId });


    if (!posts.length) {
        return res.json({ message: "해당 게시글이 없습니다." });
    }



    await Comment.create({
        _postId,
        user,
        password,
        content,
        createdAt: new Date(),
    });

    
    res.json({ message: "댓글을 생성하였습니다." });
});

// ------------------

router.get("/comments/:_postId", async (req, res) => {

    const { _postId } = req.params;


    const posts = await Posts.find({ _id: _postId });


    if (!posts.length) {
        return res.json({ message: "해당 게시글이 없습니다." });
    }


    const allCommentInfo = await Comment.find({ _postId });
    const data = [];


    for (let i = 0; i < allCommentInfo.length; i++) {
        data.push({
            commentId: allCommentInfo[i]._id.toString(),
            user: allCommentInfo[i].user,
            content: allCommentInfo[i].content,
            createdAt: allCommentInfo[i].createdAt,
        });
    }


    res.json({ data: data });
});

// // 댓글 수정 with PUT ('/api/comments/_commentId')
router.put("/comments/:_commentId", async (req, res) => {

    const { _commentId } = req.params;

    const { password, content } = req.body;


    const comments = await Comment.find({ _id: _commentId });


    if (!comments.length) {
        return res.json({ message: "해당 댓글이 없습니다." });
    }


    await Comment.updateOne(
        {
            _id: _commentId,
        },
        {

            $set: {
                password: password,
                content: content,
            },
        }
    );


    res.json({ message: "댓글을 수정하였습니다." });
});



// 게시글 삭제 with DELETE ('/api/comments/_commentId')
router.delete("/comments/:_commentId", async (req, res) => {

    const { _commentId } = req.params;

    const { password } = req.body;


    const comments = await Comment.find({ _id: _commentId });


    if (!comments.length) {
        return res.json({ message: "해당 댓글이 없습니다." });
    }


    const db_password = comments[0]["password"];
    if (db_password != password) {
        return res.json({ message: "비밀번호를 확인해주세요." });


    } else {
        await Comment.deleteOne({ _id: _commentId });


        return res.json({ message: "댓글을 삭제하였습니다." });
    }
});
module.exports = router;