import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { isValidUUID } from '../helpers/check-uuid';
import { DatabaseService } from '../infrastructure/database/database.service';

@Injectable()
export class TaskService {
    constructor(private readonly databaseService: DatabaseService) {}

    async addTask(name: string, userId: string, priority: any): Promise<Task> {
        const user = await this.databaseService.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            new BadRequestException('No User found!');
        }

        const priorityInNumber = isNaN(priority) ? +priority : priority;
        const newTask = await this.databaseService.task.create({
            data: { name, userId, priority: priorityInNumber },
        });

        return newTask;
    }

    async getTaskByName(name: string): Promise<Task | null> {
        return this.databaseService.task.findFirst({
            where: { name },
        });
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        try {
            if (!isValidUUID(userId)) {
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
