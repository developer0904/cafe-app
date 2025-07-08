import express from 'express'
import mongoose from 'mongoose';
import Router from './routes/userRoutes.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(express.json());

const db = process.env.DATABASE

mongoose.connect(db).then(()=>{
    
    app.listen(8080, ()=>{
    console.log("server running on port 8080");

    })
})

app.use("/api/users", Router);

