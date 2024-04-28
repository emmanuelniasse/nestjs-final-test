import {
    IsNotEmpty,
    IsString,
    IsUUID,
    Matches,
    MinLength,
} from 'class-validator';

export class AddTaskDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @Matches(/^[0-9]*$/)
    priority: number;
}
