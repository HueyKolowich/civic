import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class IssueDto {
    @IsString()
    @IsNotEmpty()
    level!: string;

    @IsNumber()
    level_id!: number;

    @IsString()
    @IsNotEmpty()
    description!: string;
}
