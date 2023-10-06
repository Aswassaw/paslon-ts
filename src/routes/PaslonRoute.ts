import * as express from "express";
import PaslonController from "../controllers/PaslonController";
import UploadImage from "../middlewares/UploadImage";

const PaslonRoute = express.Router();
PaslonRoute.get("/paslons", PaslonController.findAll);
PaslonRoute.post("/paslon", UploadImage.single("image"), PaslonController.create);
PaslonRoute.get("/paslon/:id", PaslonController.findById);
PaslonRoute.put("/paslon/:id", UploadImage.single("image"), PaslonController.updateById);
PaslonRoute.delete("/paslon/:id", PaslonController.deleteById);

export default PaslonRoute;
