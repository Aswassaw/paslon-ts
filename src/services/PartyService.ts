import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Party } from "./../entities/Party";
import { AppDataSource } from "../data-source";
import { createPartyValidation } from "./../validations/PartyValidation";

class PartyService {
  private readonly PartyRepository: Repository<Party> =
    AppDataSource.getRepository(Party);

  async findAll(req: Request, res: Response) {
    try {
      let parties = await this.PartyRepository.query(
        `SELECT id, name, "createdAt" as created_at, "updatedAt" as updated_at FROM "party"`
      );

      return res.status(200).json({
        code: 200,
        data: parties,
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

      const { error } = createPartyValidation.validate(data);
      if (error) return res.status(400).json({ code: 400, error });

      const newParty = await this.PartyRepository.query(
        `INSERT INTO party(name) VALUES($1) RETURNING id, name, "createdAt" as created_at, "updatedAt" as updated_at`,
        [data.name]
      );

      return res.status(201).json({
        code: 201,
        data: newParty[0],
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

      const partyDetail = await this.PartyRepository.query(
        `SELECT id, name, "createdAt" as created_at, "updatedAt" as updated_at FROM "party" WHERE id=$1`,
        [id]
      );

      if (!partyDetail.length) {
        return res.status(404).json({
          code: 404,
          error: "Party Not Found",
        });
      }

      return res.status(200).json({
        code: 200,
        data: partyDetail[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
      });
    }
  }

  async updateById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const data = req.body;

      const { error } = createPartyValidation.validate(data);
      if (error) return res.status(400).json({ code: 400, error });

      const partyDetail = await this.PartyRepository.query(
        `SELECT id FROM "party" WHERE id=$1`,
        [id]
      );

      if (!partyDetail.length) {
        return res.status(404).json({
          code: 404,
          error: "Party Not Found",
        });
      }

      const editedParty = await this.PartyRepository.query(
        `UPDATE "party" SET name=$1, "updatedAt"=$2 WHERE id=$3 RETURNING id, name, "createdAt" as created_at, "updatedAt" as updated_at`,
        [data.name, new Date(), id]
      );

      return res.status(200).json({
        code: 200,
        data: editedParty[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
      });
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const partyDetail = await this.PartyRepository.query(
        `SELECT id FROM "party" WHERE id=$1`,
        [id]
      );

      if (!partyDetail.length) {
        return res.status(404).json({
          code: 404,
          error: "Party Not Found",
        });
      }

      await this.PartyRepository.query(`DELETE FROM "party" WHERE id=$1`, [id]);

      return res.status(200).json({
        code: 200,
        data: {},
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

export default new PartyService();
