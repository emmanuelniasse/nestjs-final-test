import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    register(
        @Body(new ValidationPipe({ skipMissingProperties: true }))
        userDto: UserDto,
    ) {
        const email = userDto.email;
        return this.userService.addUser(email);
    }
}
