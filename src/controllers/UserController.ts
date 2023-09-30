import { Request, Response } from "express";
import UserService from "../services/UserService";

export default new (class UserController {
  findAll(req: Request, res: Response) {
    UserService.findAll(req, res);
  }
  create(req: Request, res: Response) {
    UserService.create(req, res);
  }
  findById(req: Request, res: Response) {
    UserService.findById(req, res);
  }
  updateById(req: Request, res: Response) {
    UserService.updateById(req, res);
  }
  deleteById(req: Request, res: Response) {
    UserService.deleteById(req, res);
  }
})();
