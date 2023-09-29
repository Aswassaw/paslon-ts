import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Users } from "../entities/Users";
import { AppDataSource } from "../data-source";
import { createUserSchema } from "../validations/UserValidation";
import { deleteFile } from "../utils/FileHelper";
import { uploadToCloudinary } from "../utils/Cloudinary";

class UserService {
  private readonly UserRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async findAll(req: Request, res: Response) {
    try {
      const paslons = await this.UserRepository.query(
        `SELECT id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at FROM "users"`
      );

      return res.status(200).json({
        code: 200,
        data: paslons,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
      });
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
        // save to cloudinary
        image = await uploadToCloudinary(req.file);
        // delete file from local server after save to cloudinary
        deleteFile(req.file.path);
      }

      const newPaslon = await this.UserRepository.query(
        `INSERT INTO users(name, vision, image) VALUES($1, $2, $3) RETURNING id, name, vision, "createdAt" as created_at, "updatedAt" as updated_at`,
        [data.name, data.vision, image]
      );

      return res.status(201).json({
        code: 201,
        data: newPaslon,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
      });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const paslonDetail = await this.UserRepository.query(
        `SELECT id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at FROM "users" WHERE id=$1`,
        [id]
      );

      if (!paslonDetail.length) {
        return res.status(404).json({
          code: 404,
          error: "Paslon Not Found",
        });
      }

      return res.status(200).json({
        data: paslonDetail,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
      });
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
