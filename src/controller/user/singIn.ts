import bcrypt from "bcrypt";
import USERS from "../../db/Schemas/users.schemas";
import jwt from "jsonwebtoken";
import filterUser from "../../helpers/filterUser";

export default async function signIn(data:any){
    try {
        console.log("/signin",data)
        const {id, password} = data;
        const user = await USERS.findOne({$or: [{email: id}, {username: id}]}).lean();
        console.log(user)
        if(!user) throw new Error("User not found");
        if(!comparePassword(password, user.password)) throw new Error("Email or password is incorrect");
        const JWT = await generateJWT(user);
        if(!JWT) throw new Error("Error generating token");
        return {user: filterUser(user), token: JWT};
    } catch (error) {
        throw error;
    }

}

export function comparePassword(password:string, hashedPassword:string){
    try {
        return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
        return false;
    }
}


async function generateJWT(user:any){
    try {
        const timeStamp = Date.now();
        const sercret = process.env.JWT_SECRET_KEY || "secret";
        console.log('sercret', sercret);
        
        const JWT = jwt.sign({
            id: user._id,
            createdAt: timeStamp,
            expiresAt: timeStamp + 1000 * 60 * 60 *24 ,
        },sercret , {expiresIn: "1d"});
        return JWT;
    } catch (error) {
        return false
    }
}