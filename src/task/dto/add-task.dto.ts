import { IsString, MinLength } from 'class-validator';

export class AddTaskDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    userId: number;

    @IsString()
    priority: number;
}
