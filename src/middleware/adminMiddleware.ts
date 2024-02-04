import serverResponse from "../helpers/serverResponse";
import decodeToken from "./decodeToken";

export default async function adminMiddleware(req:any,res:any,next:any) {
    try {
        const token = req.headers['access-token'] || req.cookies['access-token'];
        if (!req.user?._id) {
            const user = await decodeToken(token);
            if (user?.userType == 'admin'
                // || user?.userType == 'store'
                // || user?.userType == 'accounts'
            ) {
                req.user = user;
                next();
            } else throw { message: "User not found", code: 1004047 }
        }
        else {
            if (req.user?.userType == 'admin'
                // || req.user?.userType == 'store'
                // || req.user?.userType == 'accounts'
            ) next();
            else throw { message: "User not found", code: 1004048 }
        }
    } catch (error) {
        return serverResponse(false, "Unauthorized", error, res)
    }
}