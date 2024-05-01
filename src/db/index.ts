import mongoose from "mongoose";

export default function connectDB() {
    
    const MONGO_URI = process.env.MONGO_DB_URI || "mongodb://localhost:27017";
    
    mongoose.connect(MONGO_URI, {
        useBigInt64: true,
        retryWrites: true,
    })

    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}