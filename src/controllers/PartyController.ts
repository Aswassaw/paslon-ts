import { Request, Response } from "express";
import PartyService from "../services/PartyService";

export default new (class UserController {
  findAll(req: Request, res: Response) {
    PartyService.findAll(req, res);
  }
  create(req: Request, res: Response) {
    PartyService.create(req, res);
  }
  findById(req: Request, res: Response) {
    PartyService.findById(req, res);
  }
  updateById(req: Request, res: Response) {
    PartyService.updateById(req, res);
  }
  deleteById(req: Request, res: Response) {
    PartyService.deleteById(req, res);
  }
})();
