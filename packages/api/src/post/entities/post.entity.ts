import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
@Unique(['title', 'deletedAt'])
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({
    name: 'thumbnail_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  thumbnailUrl?: string;

  @Column({ type: 'varchar', length: 500 })
  summary!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ name: 'read_duration', type: 'integer', default: 1 })
  readDuration!: number;

  @Column({ name: 'published_at', type: 'timestamptz' })
  publishedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
