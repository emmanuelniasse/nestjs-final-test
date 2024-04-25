import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async addUser(email: string): Promise<User> {
        const userAlreadyExists = await this.getUser(email);
        if (userAlreadyExists) {
            throw new ConflictException('User with this email already exists');
        }
        return this.prisma.user.create({
            data: { email },
        });
    }

    getUser(email: string): Promise<unknown> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async resetData(): Promise<void> {
        try {
            await this.prisma.user.deleteMany({});
        } catch (error) {
            throw error;
        }
    }
}
