import Post from "../../db/Schemas/post.schemas."

export async function  fetchAllPost() {

    try {

        console.log("/fetchAllPost")
        const posts = await Post.find().sort({ date: -1 }).lean();
        console.log("posts",posts)
        return posts
    } catch (error) {
        console.log("ERRPOST100",error)
        return error
     
return error
    }
    
}

export async function  createPost(data:any) {

    try {

        console.log("create Post",data)


        const create = await Post.create(data)

        console.log(create)

        return create
    }catch (error){
        console.log("ERRPOST101",error)
        return error
    }
    
}
export async function  fetchPost(data:any) {

    try {
        console.log("/fetchPost")
        const {id} = data
        const postFetch = await Post.findById(id).lean();
        console.log("post",postFetch)

        return postFetch
    } catch (error) {
        console.log("ERRPOST102",error)
       return error 
    }
    
}


