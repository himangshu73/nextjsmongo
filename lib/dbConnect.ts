import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to database.");
  }

  try {
    const dbURI = process.env.MONGODB_URI;
    if (!dbURI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }
    const db = await mongoose.connect(dbURI);
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully.");
  } catch (error) {
    console.log("DB connection failed.", error);
    process.exit(1);
  }
}

export default dbConnect;
