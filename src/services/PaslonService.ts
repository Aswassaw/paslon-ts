import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Paslon } from "../entities/Paslon";
import { Party } from "./../entities/Party";
import { Vote } from "../entities/Vote";
import { AppDataSource } from "../data-source";
import { createPaslonSchema } from "../validations/PaslonValidation";
import { deleteFile } from "../utils/FileHelper";
import { uploadToCloudinary } from "../utils/Cloudinary";

class PaslonService {
  private readonly PaslonRepository: Repository<Paslon> =
    AppDataSource.getRepository(Paslon);
  private readonly PartyRepository: Repository<Party> =
    AppDataSource.getRepository(Party);
  private readonly VoteRepository: Repository<Vote> =
    AppDataSource.getRepository(Vote);

  async findAll(req: Request, res: Response) {
    try {
      let paslons = await this.PaslonRepository.query(
        `SELECT id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at FROM "paslon"`
      );
      const parties = await this.PartyRepository.query(
        `SELECT id, name, "createdAt" as created_at, "updatedAt" as updated_at, "paslonId" as paslon_id FROM party`
      );
      const votes = await this.VoteRepository.query(
        `SELECT id, "voterName", "createdAt" as created_at, "updatedAt" as updated_at, "paslonId" as paslon_id FROM vote`
      );

      paslons = paslons.map((paslon) => {
        paslon.parties = [];
        paslon.votes = [];

        // add party to paslon
        parties.forEach((party) => {
          if(party?.paslon_id === paslon.id) {
            paslon.parties.push(party)
          }
        })

        // add vote to paslon
        votes.forEach((vote) => {
          if(vote?.paslon_id === paslon.id) {
            paslon.votes.push(vote)
          }
        })

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
      if (error) return res.status(400).json({ code: 400, error });

      let image = "https://mardizu.co.id/assets/images/client/default.png";
      if (req.file?.filename) {
        image = await uploadToCloudinary(req.file);
        deleteFile(req.file.path);
      }

      const newPaslon = await this.PaslonRepository.query(
        `INSERT INTO paslon(name, vision, image) VALUES($1, $2, $3) RETURNING id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at`,
        [data.name, data.vision, image]
      );

      const partyForInsert = data.party.map((p) => ({
        
      }))

      return res.status(201).json({
        code: 201,
        data: newPaslon[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
      });
    }
  }

  // async findById(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const id = req.params.id;

  //     const paslonDetail = await this.UserRepository.query(
  //       `SELECT id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at FROM "users" WHERE id=$1`,
  //       [id]
  //     );

  //     if (!paslonDetail.length) {
  //       return res.status(404).json({
  //         code: 404,
  //         error: "Paslon Not Found",
  //       });
  //     }

  //     return res.status(200).json({
  //       code: 200,
  //       data: paslonDetail[0],
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({
  //       code: 500,
  //       error: "Internal Server Error",
  //     });
  //   }
  // }

  // async updateById(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const id = req.params.id;
  //     const data = req.body;

  //     // validasi
  //     const { error } = createUserSchema.validate(data);
  //     if (error) return res.status(400).json({ code: 400, error });

  //     // cek apakah paslon ada
  //     const paslonDetail = await this.UserRepository.query(
  //       `SELECT id, image FROM "users" WHERE id=$1`,
  //       [id]
  //     );

  //     if (!paslonDetail.length) {
  //       return res.status(404).json({
  //         code: 404,
  //         error: "Paslon Not Found",
  //       });
  //     }

  //     // set default image
  //     let image = paslonDetail[0].image;

  //     // if upload image then save to cloudinary
  //     if (req.file?.filename) {
  //       // save to cloudinary
  //       image = await uploadToCloudinary(req.file);
  //       // delete file from local server after save to cloudinary
  //       deleteFile(req.file.path);
  //     }

  //     const paslonEdited = await this.UserRepository.query(
  //       `UPDATE "users" SET name=$1, vision=$2, image=$3, "updatedAt"=$4 WHERE id=$5 RETURNING id, name, vision, image, "createdAt" as created_at, "updatedAt" as updated_at`,
  //       [data.name, data.vision, image, new Date(), id]
  //     );

  //     return res.status(200).json({
  //       code: 200,
  //       data: paslonEdited[0],
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({
  //       code: 500,
  //       error: "Internal Server Error",
  //     });
  //   }
  // }

  // async deleteById(req: Request, res: Response) {
  //   try {
  //     const id = req.params.id;

  //     const paslonDetail = await this.UserRepository.query(
  //       `SELECT id FROM "users" WHERE id=$1`,
  //       [id]
  //     );

  //     if (!paslonDetail.length) {
  //       return res.status(404).json({
  //         code: 404,
  //         error: "Paslon Not Found",
  //       });
  //     }

  //     await this.UserRepository.query(`DELETE FROM "users" WHERE id=$1`, [id]);

  //     return res.status(200).json({
  //       code: 200,
  //       data: {},
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({
  //       code: 500,
  //       error: "Internal Server Error",
  //     });
  //   }
  // }
}

export default new PaslonService();
