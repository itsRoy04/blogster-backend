import Post from "../../db/Schemas/post.schemas."

export async function  fetchAllPost() {

    try {

        console.log("/fetchAllPost")
        const posts = await Post.find().sort({ date: -1 });
        console.log("posts",posts)
    } catch (error) {
        console.log("ERRPOST100",error)
        return error
     
return error
    }
    
}

export async function  createPost(data:any) {

    try {

        console.log("create Post")


        const create = await Post.create(data)

        console.log(create)


    }catch (error){
        console.log("ERRPOST101",error)
        return error
    }
    
}
export async function  fetchPost(data:any) {

    try {
        console.log("/fetchPost")
        const {id} = data
        const postFetch = await Post.findById(id);
        console.log("post",postFetch)
    } catch (error) {
        console.log("ERRPOST102",error)
       return error 
    }
    
}


