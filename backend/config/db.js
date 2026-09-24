import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let uri = (process.env.MONGO_URI || "").trim().replace(/^["']|["']$/g, "");
    // Remove trailing ? or & if accidentally pasted
    while (uri.endsWith("?") || uri.endsWith("&")) {
      uri = uri.slice(0, -1);
    }
    await mongoose.connect(uri);
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
