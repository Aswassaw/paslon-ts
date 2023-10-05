import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Vote } from "./Vote";
import { Party } from "./Party";

@Entity()
export class Paslon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 55 })
  name: string;

  @Column({ length: 205 })
  vision: string;

  @Column({ type: "text" })
  image: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @OneToMany(() => Vote, (vote) => vote.paslon)
  votes: Vote[];

  @ManyToMany(() => Party, (party) => party.paslons)
  @JoinTable()
  parties: Party[];
}
