import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Votes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 55 })
  voterName: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.votes)
  users: Users;
}
