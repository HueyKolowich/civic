import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from 'typeorm';

@Index('idx_level_levelid', ['level', 'level_id'])
@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    position_id!: number;

    @Column({ type: 'varchar', length: 255 })
    level!: string;

    @Column()
    level_id!: number;

    @Column()
    candidate_id!: number;

    @Column({ type: 'text' })
    issue!: string;

    @Column({ type: 'text' })
    position!: string;

    @CreateDateColumn({
        type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at!: Date;
}
