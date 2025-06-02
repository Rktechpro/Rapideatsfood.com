import express from "express";
import { LoginUser, SingupUser } from "../controllers/UserControoler.js";

const UserRouter = express.Router();

UserRouter.post("/Singup", SingupUser);
UserRouter.post("/login", LoginUser);

export default UserRouter;
