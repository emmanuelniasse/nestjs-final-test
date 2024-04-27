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

    getUser(email: string): Promise<unknown> {
        return this.databaseService.user.findUnique({ where: { email } });
    }

    async resetData(): Promise<string> {
        await this.databaseService.user.deleteMany();
        return 'Users deleted';
    }
}
