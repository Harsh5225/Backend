import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// DB is at another continent
//  look for connectionInstance  when it logs
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // 5:17:13
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR :", error);
    process.exit(1);
  }
};

export default connectDB;
