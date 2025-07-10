import express from 'express'
import mongoose from 'mongoose';
import Router from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const db = process.env.DATABASE
app.get("/",(req,res)=>{
    res.send("Server Phook diya Oye!!");
})
mongoose.connect(db).then(()=>{
    
    app.listen(8080, ()=>{
    console.log("server running on port 8080");

    })
})

app.use("/api/users", Router);

