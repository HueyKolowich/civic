import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class PositionDto {
    @IsString()
    @IsNotEmpty()
    level!: string;

    @IsNumber()
    level_id!: number;

    @IsNumber()
    candidate_id!: number;

    @IsString()
    @IsNotEmpty()
    issue!: string;

    @IsString()
    @IsNotEmpty()
    position!: string;
}
