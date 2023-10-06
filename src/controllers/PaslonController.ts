import { Request, Response } from "express";
import PaslonService from "../services/PaslonService";

export default new (class UserController {
  findAll(req: Request, res: Response) {
    PaslonService.findAll(req, res);
  }
  create(req: Request, res: Response) {
    PaslonService.create(req, res);
  }
  findById(req: Request, res: Response) {
    PaslonService.findById(req, res);
  }
  updateById(req: Request, res: Response) {
    PaslonService.updateById(req, res);
  }
  deleteById(req: Request, res: Response) {
    PaslonService.deleteById(req, res);
  }
})();
