import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // 127.0.0.1 is preferred over localhost for Node.js 18+ 
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
