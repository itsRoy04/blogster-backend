import { Router } from "express";
import serverResponse from "../helpers/serverResponse";
import { signUp } from "../controller/user/signUp";
import signIn from "../controller/user/singIn";
import authMiddleware from "../middleware/authMiddleware";
import updateUser from "../controller/user/updateUser";
import updatUserDetails, { changePassword } from "../controller/user/updateDetails";
import forgotPassword, { resetPassword, verifyForgetPasswordOtp } from "../controller/user/forgetPassword";
import updateUserDetails from "../controller/user/updateDetails";

const usersRouter = Router();


usersRouter.post("/sign-up", async (req, res) => {
    try {

        console.log("Signup")
        serverResponse(true, "User created successfully", await signUp(req.body), res);
    } catch (error: any) {
        serverResponse(false, "Error creating user", error.message, res);
    }
});

usersRouter.post("/sign-in", async (req, res) => {
    try {
        serverResponse(true, "User signed in successfully", await signIn(req.body), res);     
    } catch (error: any) {
        serverResponse(false, "Error signing in", error.message, res);
    }
});

usersRouter.get("/get-user", authMiddleware,  async (req:any, res:any) => {
    try {        
        if (req.user._id) {
            serverResponse(true, "User fetched successfully", { user: req.user }, res);
        }
        else serverResponse(false, 'Invalid User','Invalid User' , res);
    } catch (error:any) {
        serverResponse(false, "Error fetching user", error.message, res);
    }
})


usersRouter.post("/update-user", async (req, res) => {
    try {
        serverResponse(true, "User created successfully", await updateUser(req.body), res);
    } catch (error: any) {
        serverResponse(false, "Error creating user", error.message, res);
    }    
});
usersRouter.post("/update-user-details",authMiddleware, async (req, res) => {
    try {
        console.log("Update User Details",req.body)
        serverResponse(true, "User Updated successfully", await updateUserDetails(req.body), res);
    } catch (error: any) {
        serverResponse(false, "Error Updateding Data for User", error.message, res);
    }
});
usersRouter.post("/reset-password",authMiddleware, async (req:any, res:any) => {
    try {
        serverResponse(true, "User Password Changed  successfully", await changePassword(req.body,req.user._id), res);
    } catch (error: any) {
        serverResponse(false, "Error Updateding Password Updateding Data for User", error.message, res);
    }
});
usersRouter.post("/forgot-password",async (req, res) => {
    try {

        console.log(req.body.email)
        serverResponse(true, "Email found successfully", await forgotPassword(req.body.email), res);
    } catch (error: any) {
        serverResponse(false, "No User Found", error.message, res);
    }
});
usersRouter.post("/verify-email-otp",async (req, res) => {
    try {

        console.log(req.body)
        serverResponse(true, "Otp Verified successfully", await verifyForgetPasswordOtp(req.body), res);
    } catch (error: any) {
        serverResponse(false, "No User Found", error.message, res);
    }
});
usersRouter.post("/update-password",async (req, res) => {
    try {

        console.log(req.body)
        serverResponse(true, "Password changed successfully", await resetPassword(req.body), res);
    } catch (error: any) {
        serverResponse(false, "Something Went Wrong", error.message, res);
    }
});



export default usersRouter;