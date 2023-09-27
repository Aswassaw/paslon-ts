import * as express from "express";
import UserController from "../controllers/UserController";

const UserRoute = express.Router();
UserRoute.post("/user", UserController.create);

export default UserRoute;
