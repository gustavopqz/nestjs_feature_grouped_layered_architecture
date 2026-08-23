import { ConnectionStringNotFoundError } from "@/errors/connectionStringNotFound.error";
import { DBConnectionError } from "@/errors/dbConnection.error";
import dotenv from 'dotenv';
import mongoose from "mongoose";

// Running dotend listening
dotenv.config();

export const connectDB = async (): Promise<void> => {
    const connectionString = process.env.MONGO_URI;

    if (!connectionString) throw new ConnectionStringNotFoundError();

    try {
        await mongoose.connect(connectionString);
    } catch (error) {
        throw new DBConnectionError(error);
    }
}