import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { loginSchema, registerSchema } from "../validations/AuthValidation";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class AuthService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(req: Request, res: Response) {
    try {
      const data = req.body;

      const { error, value } = registerSchema.validate(data);

      if (error) {
        return res.status(500).json({
          error: error.details[0].message,
        });
      }

      const checkEmail = await this.UserRepository.count({
        where: {
          email: value.email,
        },
      });

      if (checkEmail > 0) {
        return res.status(400).json({ error: "Email is already registered!" });
      }

      const password = await bcrypt.hash(value.password, 10);

      const user = this.UserRepository.create({
        full_name: value.fullName,
        email: value.email,
        password: password,
      });

      const createdUser = await this.UserRepository.save(user);
      delete createdUser.password;

      return res.status(201).json({
        code: 201,
        data: createdUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;

      const { error, value } = loginSchema.validate(data);

      if (error) {
        return res.status(500).json({
          error: error.details[0].message,
        });
      }

      const checkEmail = await this.UserRepository.findOne({
        where: {
          email: value.email,
        },
        select: ["id", "full_name", "email", "password"],
      });

      if (!checkEmail) {
        return res.status(400).json({
          error: "Email / password is wrong!",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        value.password,
        checkEmail.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          error: "Email / password is wrong!",
        });
      }

      const user = this.UserRepository.create({
        id: checkEmail.id,
        full_name: checkEmail.full_name,
        email: checkEmail.email,
      });

      const token = jwt.sign({ user }, "secret-jwt-token", { expiresIn: "1h" });

      return res.status(201).json({
        code: 200,
        data: user,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
      });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      await this.UserRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });

      return res.status(200).json({
        code: 201,
        message: "Token is valid!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
      });
    }
  }
}

export default new AuthService();
