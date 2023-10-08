import * as express from "express";
import VoteController from "../controllers/VoteController";
import { authenticate } from "../middlewares/CheckJwt";

const VoteRoute = express.Router();
VoteRoute.get("/votes", VoteController.findAll);
VoteRoute.post("/vote", authenticate, VoteController.create);

export default VoteRoute;
