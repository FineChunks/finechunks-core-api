import { PrimaryColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
