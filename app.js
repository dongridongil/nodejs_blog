const express = require("express");
const connect = require("./schemas/index")
const app =express();
const port =3000;
const postsRouter=require("./routes/posts.js");
const commentRouter =require("./routes/comment")

connect();

const requestMiddleware =(req,res,next)=>{
    console.log("Request URL",req.originalUrl, "-",new Date());
    next();
}


app.use(express.json());
app.use(requestMiddleware);

app.use("/api",[postsRouter, commentRouter]);



app.get('/', (req,res)=>{
    res.send("hello world");
    
});
app.listen(port, () => {
    console.log(port," 포트로 서버가 켜졌어요!!");
});