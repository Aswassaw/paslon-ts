import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { createUserSchema } from "../validations/User";
import { deleteFile } from "../utils/FileHelper";
import Cloudinary from "../utils/Cloudinary";

class UserService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findAll(req: Request, res: Response) {
    try {
      const paslons = await this.UserRepository.query(`SELECT * FROM "user"`);

      res.json({
        data: paslons,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      // validasi
      const { error } = createUserSchema.validate(data);
      if (error) return res.status(400).json({ error });

      // set default image
      let image = "https://mardizu.co.id/assets/images/client/default.png";

      // if upload image then save to cloudinary
      if (req.file?.filename) {
        image = await Cloudinary(req.file);
      }

      const newPaslon = this.UserRepository.create({
        name: data.name,
        vision: data.vision,
        image: data.image,
      });

      const todos = this.UserRepository.save(newPaslon);
      return res.status(201).json(todos);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const paslonDetail = await this.UserRepository.query(
        `SELECT * FROM "user" WHERE id=$1`,
        [id]
      );

      if (!paslonDetail.length) {
        return res.status(404).json({
          error: "Paslon Not Found",
        });
      }

      return res.status(200).json({
        data: paslonDetail,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // async updateById(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const id = req.params.id;
  //     const data = req.body;

  //     const { error } = createUserSchema.validate(data);
  //     if (error) return res.status(400).json({ error });

  //     const paslonDetail = await this.UserRepository.query(
  //       `SELECT * FROM "user" WHERE id=$1`,
  //       [id]
  //     );

  //     if (!paslonDetail.length) {
  //       return res.status(404).json({
  //         error: "Paslon Not Found",
  //       });
  //     }

  //     const obj = await this.UserRepository.query(
  //       `UPDATE user SET name=$1, vision=$2, image=$3 WHERE id=$4`
  //     );

  //     return res.status(201).json(obj);
  //   } catch (error) {
  //     return res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }
}

export default new UserService();
