import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config()
const SECRET = encodeURIComponent(process.env.SECRET)



const register =  async(req,res)=>{

    try {
        const {name,email,password,role} = req.body;
        const hashedpwd = await bcrypt.hash(password,10);

        const user = {name,email,password:hashedpwd,role};
        const result = await userModel.create(user);

        res.status(200).json({message:"user created",result});

    } catch (error) {

        console.log(error);
        res.send(500).json({message:"Something went wrong"});   
    }

}

const login = async(req,res)=>{

         try {
            
                const {email,password} = req.body;
                const user = await userModel.findOne({email});

                if(user){

                const isMatch = await bcrypt.compare(password,user.password);
                if(isMatch){

                    const userObj = {name:user.name,email:user.email,role:user.role}
                    const token = jwt.sign(userObj,SECRET);

                    res.status(200).json({userObj,token});
                    
                }else{

                    res.status(401).json("Inavlid email or password");
                }
      
             }

        } catch (error) {

                res.status(400).json({message:"Something went Worng"});
        }
}


const updateUser = async (req,res)=>{

   try{

         const id = req.params.id
         const body = req.body
         const result = await userModel.findByIdAndUpdate(id,body);
         res.status(200).json(result);
   }catch(err){

        res.status(404).json({message:"something went worng"});
   }

}

const deleteUser = async (req,res)=>{

    try {
        const id = req.params.id;
        // console.log(id);
        const result = await userModel.findByIdAndDelete(id);
        // console.log(result);
        
        res.status(200).json({message:"user Deleted",result});
    } catch (error) {
        res.status(404).json({message:"Unable to delete User"});
    }


}

const profile = async(req,res)=>{

   try {
         const id = req.params.id;
        const user = await userModel.findOne({_id:id});
        res.status(200).json(user);
   } catch (error) {
       res.status(404).json({message:"Unable to fetch User"});
   }
}

const showUsers = async(req,res)=>{

        try {
            
            const user = await userModel.find();
            res.status(200).json(user);

        } catch (error) {
            
            res.status(401).json({message:"Something went worng!"});
        }

}

export  {register,login,profile,showUsers,deleteUser,updateUser}