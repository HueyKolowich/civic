import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class IssueDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    level!: string;

    @IsNumber()
    @Expose()
    level_id!: number;

    @IsString()
    @IsNotEmpty()
    @Expose()
    description!: string;
}
