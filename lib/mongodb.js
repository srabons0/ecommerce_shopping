import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

if (!URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(URI, {
      bufferCommands: false,
      dbName: process.env.DB_NAME ,
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;

    throw error;
  }
  return cached.conn;
}
