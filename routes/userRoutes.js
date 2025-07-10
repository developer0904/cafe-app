
import express from 'express';
import { authenticate,authorize } from '../middleware/auth.js';
import {register,login,profile,showUsers,deleteUser,updateUser,passwordChange,updateProfile} from '../controllers/userController.js';
const Router = express.Router();

Router.post("/register",register)
Router.post("/login",login)
Router.get("/showUsers", authenticate,authorize("Admin"),showUsers)
Router.patch("/:id",authenticate,authorize("Admin"),updateUser)
Router.delete("/:id",authenticate,authorize("Admin"),deleteUser)
Router.get("/:id/profile", profile)
Router.post("/:id/passwordChange",authenticate,passwordChange);
Router.post("/:id/updateProfile",authenticate,updateProfile);


export default Router;
