const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _postId: {
        type: String, // 문자열
        required: true, 
    },
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, 
        required: true,
    },
});

module.exports = mongoose.model("Comment", schema);