import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Paslon } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import {
  createPaslonSchema,
  updatePaslonSchema,
} from "../validations/PaslonValidation";
import { deleteFile } from "../utils/FileHelper";
import { uploadToCloudinary } from "../utils/Cloudinary";

class PaslonService {
  private readonly PaslonRepository: Repository<Paslon> =
    AppDataSource.getRepository(Paslon);

  async findAll(req: Request, res: Response) {
    try {
      let paslons = await this.PaslonRepository.query(
        `SELECT id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at FROM "paslon"`
      );
      let parties = await this.PaslonRepository.query(
        `SELECT pa.id, pa.name, ppp."paslonId" as paslon_id FROM paslon_parties_party as ppp INNER JOIN party as pa ON pa.id=ppp."partyId"`
      );
      const votes = await this.PaslonRepository.query(
        `SELECT id, "voterName" as voter_name, "createdAt" as created_at, "updatedAt" as updated_at, "paslonId" as paslon_id FROM "vote"`
      );

      paslons = paslons.map((paslon) => {
        paslon.parties = [];
        paslon.votes = [];

        // add party to paslon
        parties.forEach((party) => {
          if (party?.paslon_id === paslon.id) {
            paslon.votes.push(party);
          }
        });

        // add vote to paslon
        votes.forEach((vote) => {
          if (vote?.paslon_id === paslon.id) {
            paslon.votes.push(vote);
          }
        });

        return paslon;
      });

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

      const { error } = createPaslonSchema.validate(data);
      if (error) {
        if (req.file?.filename) {
          deleteFile(req.file.path);
        }
        return res.status(400).json({ code: 400, error });
      }

      // kode untuk cek apakah partai sudah mengusung atau belum
      let allPartyPaslon = await this.PaslonRepository.query(
        `SELECT "partyId" as party_id FROM "paslon_parties_party"`
      );
      allPartyPaslon = allPartyPaslon.filter((partyPaslon) => {
        return data.party
          .map((p) => parseInt(p))
          .includes(partyPaslon.party_id);
      });

      if (allPartyPaslon.length) {
        if (req.file?.filename) {
          deleteFile(req.file.path);
        }
        return res.status(404).json({
          code: 404,
          error: "Satu partai tidak boleh mengusung lebih dari 1 paslon",
        });
      }
      // kode untuk cek apakah partai sudah mengusung atau belum

      let image = "https://mardizu.co.id/assets/images/client/default.png";
      if (req.file?.filename) {
        image = await uploadToCloudinary(req.file);
        deleteFile(req.file.path);
      }

      const newPaslon = await this.PaslonRepository.query(
        `INSERT INTO "paslon"(name, vision, image) VALUES($1, $2, $3) RETURNING id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at`,
        [data.name, data.vision, image]
      );

      // loop insert
      for (let i = 0; i < data.party.length; i++) {
        await this.PaslonRepository.query(
          `INSERT INTO "paslon_parties_party" ("partyId", "paslonId") VALUES ($1, $2)`,
          [parseInt(data.party[i], 10), newPaslon[0].id]
        );
      }
      // loop insert

      // get parties
      const parties = await this.PaslonRepository.query(
        `SELECT pa.id, pa.name FROM paslon_parties_party as ppp INNER JOIN party as pa ON pa.id=ppp."partyId" WHERE ppp."paslonId" = $1`,
        [newPaslon[0].id]
      );
      // get parties

      return res.status(201).json({
        code: 201,
        data: {
          ...newPaslon[0],
          party: parties,
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

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const paslonDetail = await this.PaslonRepository.query(
        `SELECT id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at FROM "paslon" WHERE id=$1`,
        [id]
      );

      if (!paslonDetail.length) {
        return res.status(404).json({
          code: 404,
          error: "Paslon Not Found",
        });
      }

      // get parties
      const parties = await this.PaslonRepository.query(
        `SELECT pa.id, pa.name FROM paslon_parties_party as ppp INNER JOIN party as pa ON pa.id=ppp."partyId" WHERE ppp."paslonId" = $1`,
        [id]
      );
      // get parties

      return res.status(200).json({
        code: 200,
        data: {
          ...paslonDetail[0],
          parties,
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

  async updateById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const data = req.body;

      const { error } = updatePaslonSchema.validate(data);
      if (error) {
        if (req.file?.filename) {
          deleteFile(req.file.path);
        }
        return res.status(400).json({ code: 400, error });
      }

      const paslonDetail = await this.PaslonRepository.query(
        `SELECT id, image FROM "paslon" WHERE id=$1`,
        [id]
      );

      if (!paslonDetail.length) {
        if (req.file?.filename) {
          deleteFile(req.file.path);
        }
        return res.status(404).json({
          code: 404,
          error: "Paslon Not Found",
        });
      }

      let image = paslonDetail[0].image;
      if (req.file?.filename) {
        image = await uploadToCloudinary(req.file);
        deleteFile(req.file.path);
      }

      const editedPaslon = await this.PaslonRepository.query(
        `UPDATE "paslon" SET name=$1, vision=$2, image=$3, "updatedAt"=$4 WHERE id=$5 RETURNING id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at`,
        [data.name, data.vision, image, new Date(), id]
      );

      // get parties
      const parties = await this.PaslonRepository.query(
        `SELECT pa.id, pa.name FROM paslon_parties_party as ppp INNER JOIN party as pa ON pa.id=ppp."partyId" WHERE ppp."paslonId" = $1`,
        [id]
      );
      // get parties

      return res.status(200).json({
        code: 200,
        data: {
          ...editedPaslon[0][0],
          parties,
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

  async deleteById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const paslonDetail = await this.PaslonRepository.query(
        `SELECT id FROM "paslon" WHERE id=$1`,
        [id]
      );

      if (!paslonDetail.length) {
        return res.status(404).json({
          code: 404,
          error: "Paslon Not Found",
        });
      }

      await this.PaslonRepository.query(`DELETE FROM "paslon" WHERE id=$1`, [
        id,
      ]);

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

export default new PaslonService();
