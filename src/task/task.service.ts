import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { DatabaseService } from '../infrastructure/database/database.service';

@Injectable()
export class TaskService {
    constructor(private readonly databaseService: DatabaseService) {}

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<Task> {
        const user = await this.databaseService.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            new BadRequestException('No User found!');
        }

        return this.databaseService.task.create({
            data: { name, userId, priority },
        });
    }

    // getTaskByName(name: string): Promise<unknown> {
    //     throw new NotImplementedException();
    // }

    async getUserTasks(userId: string): Promise<unknown[]> {
        try {
            if (userId.length <= 10) {
                throw new Error('Invalid userId');
            }
            const tasks = await this.databaseService.task.findMany({
                where: { userId },
            });
            return tasks;
        } catch (error) {
            throw { statusCode: 400, message: error.message };
        }
    }

    async resetData(): Promise<string> {
        await this.databaseService.task.deleteMany();
        return 'Tasks deleted';
    }
}
