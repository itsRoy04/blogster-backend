import mongoose from "mongoose";
import {ObjectId} from "mongodb"
import bcrypt from "bcrypt";
import USERS from "../../db/Schemas/users.schemas";

export async function signUp(data: any) {
    try {
     
        if(!data.email) throw new Error("Email is required");
        data.email = data.email.toLowerCase().replace(/ /g, "");
        
        let existing = await USERS.findOne({ email: data.email }).lean();
        if (existing) throw new Error("Email already exists");
        const sl = await getNewSl();
        const username = generateUsername(data.fullName, sl);
        const hashedPassword = await hashPassword(data.password);
        const user = USERS.create({
            sl,
            username,
            email: data.email,
            password: hashedPassword,
            fullName: data.fullName,
            userType: data.userRole,
            status: "active",
        });
        return user;
    } catch (error) {
        console.log(2313,error);
        throw error;
    }
}

async function getNewSl() {
    try {
        const last = await USERS.findOne().sort({ sl: -1 }).lean();
        if (!last) return 1;
        return last.sl + 1;
    } catch (error) {
        throw error;
    }
}

function generateUsername(name: string, serial: number) {
    try {
        name = name.toLowerCase().replace(/ /g, "");
        let username = `${name.slice(0,6)}${serial.toString(16)}`.toLowerCase();
        return username;
    } catch (error) {
        throw error;
    }
}

export async function hashPassword(password: string) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}