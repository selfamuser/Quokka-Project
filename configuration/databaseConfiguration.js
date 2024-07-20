import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.log(`Error in connecting to database due to ${error}`);
  }
};

export default connectDatabase;
