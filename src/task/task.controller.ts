import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { AddTaskDto } from './dto/add-task.dto';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('user/:userId')
    getUser(@Param('userId') userId: string) {
        return this.taskService.getUserTasks(userId);
    }

    @Post()
    async addTask(
        @Body(new ValidationPipe({ skipMissingProperties: true }))
        addTaskDto: AddTaskDto,
    ) {
        const { name, userId, priority } = addTaskDto;
        const priorityInt = +priority;
        return await this.taskService.addTask(name, userId, priorityInt);
    }
}
