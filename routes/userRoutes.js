
import express from 'express';
import { authenticate,authorize } from '../middleware/auth.js';
import {register,login,profile,showUsers,deleteUser,updateUser} from '../controllers/userController.js';
const Router = express.Router();

Router.post("/register",register)
Router.post("/login",login)
Router.get("/showUsers", authenticate,authorize("Admin"),showUsers)
Router.patch("/:id",authenticate,authorize("Admin"),updateUser)
Router.delete("/:id",authenticate,authorize("Admin"),deleteUser)
Router.get("/:id/profile", profile)


export default Router;
