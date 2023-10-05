import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Votes } from "../entities/Votes";
import { Users } from "../entities/Users";
import { AppDataSource } from "../data-source";
import { createVoteSchema } from "../validations/VoteValidation";

class VoteService {
  private readonly VoteRepository: Repository<Votes> =
    AppDataSource.getRepository(Votes);
  private readonly UserRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async findAll(req: Request, res: Response) {
    try {
      const votes = await this.VoteRepository.find({
        relations: ["users"],
      });

      return res.status(200).json({
        code: 200,
        data: votes,
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
      const { error } = createVoteSchema.validate(data);
      if (error) return res.status(400).json({ code: 400, error });

      const newVote = await this.VoteRepository.query(
        `INSERT INTO votes("voterName", "usersId") VALUES($1, $2) RETURNING id, "voterName"`,
        [data.voterName, data.paslonId]
      );

      const paslonRelatedToVote = await this.UserRepository.findOneBy({
        id: data.paslonId,
      });

      return res.status(201).json({
        code: 201,
        data: {
          ...newVote[0],
          paslon: paslonRelatedToVote,
        },
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

export default new VoteService();
