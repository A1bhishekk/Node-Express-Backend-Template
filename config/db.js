import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB Database Successfully: ${conn.connection.host}`.brightRed);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    };

export default connectDB;