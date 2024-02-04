import { Router } from "express";
import serverResponse from "../helpers/serverResponse";
import { createPost, fetchPost } from "../controller/blog/post";


const blogRouter = Router();


blogRouter.get("/fetch-all-post", async (req, res) => {
    try {

        console.log("/create-post")
        serverResponse(true, "Post created successfully", await createPost(req.body), res);
    } catch (error: any) {
        serverResponse(false, "Error creating Post", error.message, res);
    }
});
blogRouter.post("/create-post", async (req, res) => {
    try {

        console.log("/create-post")
        serverResponse(true, "Post created successfully", await createPost(req.body), res);
    } catch (error: any) {
        serverResponse(false, "Error creating Post", error.message, res);
    }
});
blogRouter.post("/fetch-post-by-id", async (req, res) => {
    try {

        console.log("/fetch-post-by-id")
        serverResponse(true, "Post created successfully", await fetchPost(req.body), res);
    } catch (error: any) {
        serverResponse(false, "Error creating Post", error.message, res);
    }
});




export default blogRouter 