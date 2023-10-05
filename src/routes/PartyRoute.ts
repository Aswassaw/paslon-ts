import * as express from "express";
import PartyController from "../controllers/PartyController";

const PartyRoute = express.Router();
PartyRoute.get("/parties", PartyController.findAll);
PartyRoute.post("/party", PartyController.create);
PartyRoute.get("/party/:id", PartyController.findById);
PartyRoute.put("/party/:id", PartyController.updateById);
PartyRoute.delete("/party/:id", PartyController.deleteById);

export default PartyRoute;
