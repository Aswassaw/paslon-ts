import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Paslon } from "./Paslon";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 55 })
  voterName: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @ManyToOne(() => Paslon, (paslon) => paslon.votes)
  paslon: Paslon;
}
