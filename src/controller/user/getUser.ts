import USERS from "../../db/Schemas/users.schemas";
import { ObjectId } from "mongodb";
export async function getAUserById(userId: string) {
    try {
        return await USERS.findOne({_id: new ObjectId(userId), status:{$ne: "deleted"}}).lean();        
    } catch (error) {
        throw error;
    }
}

export async function getAUser(id:string){
    try {
        return await USERS.findOne({$or: [{email: id}, {username: id}]}).lean();
    } catch (error) {
        throw error;
    }
}