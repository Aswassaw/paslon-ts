import * as express from "express";
import UserController from "../controllers/UserController";

const UserRoute = express.Router();
UserRoute.get("/paslons", UserController.findAll);
UserRoute.post("/paslon", UserController.create);

export default UserRoute;
