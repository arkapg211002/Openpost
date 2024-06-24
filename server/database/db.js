import mongoose from "mongoose";
import dotenv from 'dotenv';

// mongodb://user:<password>@ac-pzuffbo-shard-00-00.29pqijm.mongodb.net:27017,ac-pzuffbo-shard-00-01.29pqijm.mongodb.net:27017,ac-pzuffbo-shard-00-02.29pqijm.mongodb.net:27017/?ssl=true&replicaSet=atlas-iqmget-shard-0&authSource=admin&retryWrites=true&w=majority&appName=gmailclone
dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
    const DB_URI = `mongodb://${USERNAME}:${PASSWORD}@ac-pzuffbo-shard-00-00.29pqijm.mongodb.net:27017,ac-pzuffbo-shard-00-01.29pqijm.mongodb.net:27017,ac-pzuffbo-shard-00-02.29pqijm.mongodb.net:27017/?ssl=true&replicaSet=atlas-iqmget-shard-0&authSource=admin&retryWrites=true&w=majority&appName=gmailclone`;
    try {
        mongoose.connect(DB_URI, { useNewUrlParser: true });
        mongoose.set('strictQuery', true); // set strict query
        console.log('Database connected sucessfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message)
    }
}

export default Connection;