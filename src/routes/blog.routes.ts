import express, { Router, urlencoded } from 'express';
import serverResponse from "../helpers/serverResponse";
import { createPost, fetchAllPost, fetchPost } from "../controller/blog/post";



const blogRouter =  Router();
blogRouter.use(urlencoded({ extended: true }));
blogRouter.use(express.json());

blogRouter.get("/fetch-all-post", async (req, res) => { 
    try {

        console.log("/fetch-all-post")
        serverResponse(true, "fetch-all-post successfully", await fetchAllPost(), res);
    } catch (error: any) {
        serverResponse(false, "Error creating Post", error.message, res);
    }
});
blogRouter.post("/create-post", async (req, res) => {
    try { 
 
        console.log("/create-post",req.body) 
        serverResponse(true, "Post created successfully", await createPost(req.body), res);
    } catch (error: any) {
        serverResponse(false, "Error creating Post", error.message, res);
    }
});
blogRouter.post("/fetch-post-by-id", async (req, res) => {
    try {

        console.log("/fetch-post-by-id")
        serverResponse(true, "fetched successfully", await fetchPost(req.body), res);
    } catch (error: any) {
        serverResponse(false, "Error creating Post", error.message, res);
    }
});




export default blogRouter 