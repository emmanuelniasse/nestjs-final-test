import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from '../infrastructure/database/database.service';

@Injectable()
export class UserService {
    constructor(private databaseService: DatabaseService) {}

    async addUser(email: string): Promise<User> {
        const userAlreadyExists = await this.getUser(email);
        if (userAlreadyExists) {
            throw new ConflictException('User with this email already exists');
        }
        return this.databaseService.user.create({
            data: { email },
        });
    }

    async getUser(email: string): Promise<unknown> {
        return await this.databaseService.user.findUnique({ where: { email } });
    }

    async resetData(): Promise<string> {
        // Wait for 50ms to allow `task.deleteMany()` function to finish before proceeding
        await new Promise((resolve) => {
            setTimeout(async () => {
                await this.databaseService.user.deleteMany();
                resolve('Users deleted');
            }, 50);
        });
        return 'Users deleted';
    }
}
