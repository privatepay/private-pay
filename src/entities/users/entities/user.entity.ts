import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDocumentType } from '@/types/user.interface';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  document: string;

  @Column({ type: 'enum', enum: IDocumentType })
  documentType: IDocumentType;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  codename?: string | null;

  @Column({ select: false })
  password: string;

  @Column({ default: 'pt-BR' })
  language: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}


