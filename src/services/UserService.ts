import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { createUserSchema } from "../utils/User";

class UserService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findAll(req: Request, res: Response) {
    try {
      const paslonData = await this.UserRepository.find();

      res.json({
        data: paslonData,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error } = createUserSchema.validate(data);
      if (error) return res.status(400).json({ error });

      const obj = this.UserRepository.create({
        name: data.name,
        vision: data.vision,
        image: data.image,
      });

      const todos = this.UserRepository.save(obj);
      return res.status(200).json(todos);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new UserService();
