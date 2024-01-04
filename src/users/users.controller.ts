import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/enitites/user.entities';
import { AuthGaurd } from 'src/gaurds/auth.gaurd';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post("/register")
    @UseGuards(AuthGaurd)
    registerUser(@Body() user:User): Promise<User> {
        return this.usersService.registerUser(user);
    }
    
    @Post("/login")
    loginUser(@Body() user:User) : Promise<string>{
        return this.usersService.loginUser(user)
    }

    @Get("/get/:id")
    getSingleUser(@Param()param : {id:string} ): Promise<User> {
        const {id} = param
        return this.usersService.getUsers(+id);
    }

    @Get("/get-all-users")
    getAllUser(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }
}
