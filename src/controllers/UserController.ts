import { Request, Response } from "express";
import UserService from "../services/UserService";

export default new class UserController {
  create(req: Request, res: Response) {
    UserService.create(req, res)
  }
}