import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from 'typeorm';

@Index('idx_issueid_actortype', ['issue_id', 'actor_type'])
@Entity()
export class Affinity {
    @PrimaryGeneratedColumn()
    affinity_id!: number;

    @Column({ type: 'varchar', length: 255 })
    actor_type!: string;

    @Column()
    actor_id!: number;

    @Column()
    issue_id!: number;

    @Column()
    affinity!: number;

    @CreateDateColumn({
        type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at!: Date;
}
