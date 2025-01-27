import mongoose from 'mongoose';
import { DB_URL } from './serverConfig.js';


async function connectDb() {
    try {
        await mongoose.connect(DB_URL);
        console.log('successfully Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}


export default connectDb;