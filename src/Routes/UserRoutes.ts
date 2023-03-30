import express from "express";
import { GetSingleUser, UsersLogin, UsersRegistration } from "../Controllers/UserControllers";


import {
  UserRegisterValidation,
  UserLoginValidation,
} from "../Middlewares/UserValidation/UserValidation";

const UserRouter = express.Router();

UserRouter.route("/registeruser").post(
  UserRegisterValidation,
 UsersRegistration
);
UserRouter.route("/loginuser").post(UserLoginValidation, UsersLogin);
UserRouter.route("/getsingleuser/:userID").get(GetSingleUser);


export default UserRouter;
