import * as express from "express";
import UserController from "../controllers/UserController";
import UploadImage from "../middlewares/UploadImage";

const UserRoute = express.Router();
UserRoute.get("/paslons", UserController.findAll);
UserRoute.post("/paslon", UploadImage.single("image"), UserController.create);
UserRoute.get("/paslons/:id", UserController.findById);

export default UserRoute;
