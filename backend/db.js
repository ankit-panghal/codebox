import  mongoose from 'mongoose';
import 'dotenv/config'

async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  } 
  connectToDatabase();
  