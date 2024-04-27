import {
    BadRequestException,
    Injectable,
    NotImplementedException,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<Task> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        console.log(user);
        //     console.log('u', user);
        //             // Créer l'utilisateur avec l'email donné

        //     return this.prisma.task.create({
        //         data: { name, user: { connect: { id: userId } }, priority },
        //     });
        // } else {
        //     throw new Error();
        // }
        await this.prisma.user
            .findUniqueOrThrow({
                where: { id: userId },
            })
            .catch(() => new BadRequestException('No User found!'));

        return this.prisma.task.create({
            // data: { name, user: { connect: { id: userId } }, priority },
            data: { name, userId, priority },
        });
    }

    getTaskByName(name: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    async getUserTasks(userId: string): Promise<unknown[]> {
        try {
            if (userId.length <= 10) {
                throw new Error('Invalid userId');
            }
            const tasks = await this.prisma.task.findMany({
                where: { userId },
            });
            return tasks;
        } catch (error) {
            throw { statusCode: 400, message: error.message };
        }
    }

    async resetData(): Promise<void> {
        try {
            await this.prisma.task.deleteMany({});
        } catch (error) {
            throw error;
        }
    }
}
