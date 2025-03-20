import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AffinityDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    actor_type!: string;

    @IsNumber()
    @Expose()
    actor_id!: number;

    @IsNumber()
    @Expose()
    issue_id!: number;

    @IsString()
    @Expose()
    position!: string;

    @IsNumber()
    @Expose()
    affinity!: number;
}
