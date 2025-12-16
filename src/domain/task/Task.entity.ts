import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string; // procurement | development | future

  @Column()
  status!: number;

  @Column()
  assignedUserId!: number;

  @Column({ default: false })
  isClosed!: boolean;

  @Column({ type: 'jsonb', nullable: true })
  customData!: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;
}
