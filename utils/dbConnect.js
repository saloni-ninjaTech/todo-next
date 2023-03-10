import mongoose from "mongoose";
mongoose.set('strictQuery', true);
const DB_URL = process.env.MONGODB_URI;

if (!DB_URL) {
    throw new Error("Please define DB URL in environment variable inside env.local")
}

let cached = global.mongoose; 
if (!cached) {
    
    cached = global.mongoose = { conn: null, promise: null }
}


const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        cached.promise = mongoose.connect(DB_URL, options).then((mongoose) => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect; 