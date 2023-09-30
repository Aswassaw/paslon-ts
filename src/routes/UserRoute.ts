import * as express from "express";
import UserController from "../controllers/UserController";
import UploadImage from "../middlewares/UploadImage";

const UserRoute = express.Router();
UserRoute.get("/paslons", UserController.findAll);
UserRoute.post("/paslon", UploadImage.single("image"), UserController.create);
UserRoute.get("/paslon/:id", UserController.findById);
UserRoute.put("/paslon/:id", UploadImage.single("image"), UserController.updateById);

export default UserRoute;
