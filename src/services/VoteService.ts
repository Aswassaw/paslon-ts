import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Vote } from "../entities/Vote";
import { AppDataSource } from "../data-source";
import { createVoteSchema } from "../validations/VoteValidation";

class VoteService {
  private readonly VoteRepository: Repository<Vote> =
    AppDataSource.getRepository(Vote);

  async findAll(req: Request, res: Response) {
    try {
      const votes = await this.VoteRepository.find({
        relations: ["paslon", "user"],
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

      const { error } = createVoteSchema.validate(data);
      if (error) return res.status(400).json({ code: 400, error });

      const loginSession = res.locals.loginSession;

      // cek apakah user sudah pernah vote
      const userAlreadyVoted = await this.VoteRepository.query(
        `SELECT id FROM vote WHERE "userId"=$1`,
        [loginSession.user.id]
      );
      if (userAlreadyVoted.length) {
        return res.status(404).json({
          code: 404,
          error: "Anda sudah pernah melakukan vote sebelumnya",
        });
      }

      const newVote = await this.VoteRepository.query(
        `INSERT INTO vote("userId", "paslonId") VALUES($1, $2) RETURNING id`,
        [loginSession.user.id, data.paslonId]
      );

      const paslonRelatedToVote = await this.VoteRepository.query(
        `SELECT id, name, vision FROM "paslon" WHERE id=$1`,
        [data.paslonId]
      );

      return res.status(201).json({
        code: 201,
        data: {
          ...newVote[0],
          voter_name: loginSession.user.full_name,
          paslon: paslonRelatedToVote[0],
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
