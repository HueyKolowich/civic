import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from 'typeorm';

@Index('idx_name', ['name'])
@Entity()
export class Candidate {
    @PrimaryGeneratedColumn()
    candidate_id!: number;

    @Column({ type: 'varchar', length: 255 })
    level!: string;

    @Column()
    level_id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @CreateDateColumn({
        type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at!: Date;
}
