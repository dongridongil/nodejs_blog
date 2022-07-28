const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    // postsId: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    user: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        required: true,

    },
    content: {
        type: String,
        required: true,

    },
})

module.exports = mongoose.model("Posts", postSchema);