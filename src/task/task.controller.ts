import { Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('user/:userId')
    getUser(@Param('userId') userId: string) {
        return this.taskService.getUserTasks(userId);
    }

    // @Post()
    // addTask(
    //     @Body(new ValidationPipe({ skipMissingProperties: true }))
    //     addTaskDto: AddTaskDto,
    // ) {
    //     const { name, userId, priority } = addTaskDto;
    //     console.log(name, userId, priority);
    //     // return this.taskService.addTask( name, userId, priority)
    // }
}
