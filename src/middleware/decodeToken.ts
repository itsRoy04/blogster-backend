import { getAUserById } from "../controller/user/getUser";
import jwt from "jsonwebtoken";

export default async function decodeToken(token:string) {
    // console.log('adminMiddleware', token);

    if (!token) throw { message: "No token found" }
    const sercret = process.env.JWT_SECRET_KEY || "secret";
    const data: any = jwt.verify(token, sercret);
    const {id, createdAt, expiresAt} = data;  
    const timeStamp = Date.now();
    if (timeStamp > expiresAt) throw { message: "Token expired" }
    let user:any = await getAUserById(id);
    if(!user) throw { message: "User not found" }
    if(user.status == "inactive") throw { message: "User is not active" }
    if(createdAt < user?.passwordUpdatedAt) throw { message: "Password updated, Please Login again" }
    return user;

}