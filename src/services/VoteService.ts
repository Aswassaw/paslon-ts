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
        relations: ["paslon"],
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

      const userAlreadyVoted = await this.VoteRepository.query(
        `SELECT id FROM vote WHERE LOWER("voterName")=$1`,
        [req.body.voterName.toLowerCase()]
      );
      if (userAlreadyVoted.length) {
        return res.status(404).json({
          code: 404,
          error: "User dengan name tersebut sudah melakukan vote",
        });
      }

      const newVote = await this.VoteRepository.query(
        `INSERT INTO vote("voterName", "paslonId") VALUES($1, $2) RETURNING id, "voterName" as voter_name`,
        [data.voterName, data.paslonId]
      );

      const paslonRelatedToVote = await this.VoteRepository.query(
        `SELECT id, name, vision FROM "paslon" WHERE id=$1`,
        [data.paslonId]
      );

      return res.status(201).json({
        code: 201,
        data: {
          ...newVote[0],
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
