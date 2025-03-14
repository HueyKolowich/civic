import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Issue {
    @PrimaryGeneratedColumn()
    issue_id!: number;

    @Column({ type: 'varchar', length: 255 })
    level!: string;

    @Column()
    level_id!: number;

    @Column({ type: 'text' })
    description!: string;

    @CreateDateColumn({
        type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at!: Date;
}
