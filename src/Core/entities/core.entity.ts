import { IsDate, IsOptional } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
