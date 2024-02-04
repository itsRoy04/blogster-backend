import bcrypt from "bcrypt";
import USERS from "../../db/Schemas/users.schemas";

export default async function updateUser(data:any){
    try {
        const {id} = data;

        const user = await USERS.findById(id).lean();
        if(!user) throw new Error("User not found");
        delete data.id;
        if(data.password) {
            delete data.password;
        }
        let updated = await USERS.findByIdAndUpdate(id, data, {new: true}).lean();
        return updated;
      
    } catch (error) {
        throw error;
    }

}