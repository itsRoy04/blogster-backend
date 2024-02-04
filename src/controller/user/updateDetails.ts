import bcrypt from "bcrypt";
import USERS from "../../db/Schemas/users.schemas";
import { hashPassword } from "./signUp";
import { comparePassword } from "./singIn";

export default async function updateUserDetails(data: any) {

  console.log("updatUserDetails",data.updateUser.email)
  try {
    console.log(data);
    let id = { _id: data.updateUser._id };
    let oldInfo: any = await USERS.findOne({
      email: data.updateUser.email,
    }).lean();
    let info: any = await USERS.findOne({
      email: data.updateUser.email,
    }).lean();

    console.log("oldInfo", oldInfo);

    if (
      info.username === data.updateUser.username &&
      info.email === data.updateUser.email &&
      info.firstName === data.updateUser.firstName &&
      info.lastName === data.updateUser.lastName &&
      !data.password
    ) {
      throw new Error("No new Changes");
    }

    if (data.updateUser) {
      // update details

      //    let  data = {data.updateUser}
      console.log("Update Data");

      if (!oldInfo) {
        let newEmail: any = await USERS.findByIdAndUpdate(id, data.updateUser, {
          new: true,
        }).lean();
        console.log("New Email", newEmail);
      } else {
        let newInfo = await USERS.findByIdAndUpdate(id, data.updateUser, {
          new: true,
        }).lean();

        console.log("Updated Details", newInfo);
      }

      // }
      return true;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function changePassword(data: any,id:any) {
  try {
   console.log(id)
    let oldInfo: any = await USERS.findById(id
    )
    console.log(oldInfo)
    if(!oldInfo ) {
      throw new Error("Something went wrong");
    }


    if (
      data.oldPassword &&
      data.password &&
      data.password != "" &&
      data.oldPassword !== data.password &&
      oldInfo
    ) {
      //update password
      // check old Password
      console.log("Change Password");

      if (!comparePassword(data.oldPassword, oldInfo.password)) {
        throw new Error("Password is incorrect");
      } else {
        console.log("Password Updated");
        let hashedPassword = await hashPassword(data.password);
        let passwordUpdate: any = await USERS.findByIdAndUpdate(
          id,
          { password: hashedPassword },
          {
            new: true,
          }
        ).lean();
        console.log("password updated ", passwordUpdate);
     
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
