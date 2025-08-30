import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected Successfully")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}greencart`);
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDatabase;