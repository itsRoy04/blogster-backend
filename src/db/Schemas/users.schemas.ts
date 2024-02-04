import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    sl: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    connectedDevices: [{
        type: String,
        required: false,
    }],
    connectedDevicesCount: {
        type: Number,
        required: false,
    },
    userType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive", "deleted"],
        default: "active",
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    passwordUpdatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    forgetPassword:{
        otp: String,
        createdAt: Date,
        expiresAt: Date,
        slug: String
    },
    
});

const USERS = mongoose.model("users", userSchema);
export default USERS;