import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Post("/signup")
    userSignup():string{
        return "user registered successfully"
    }

    @Post("/signin")
    userSignin():string{        
        return "user loggedin"
    }

    @Get("/getall")
    getUsers():string{
        return "logic to fetch all users"
    }

}
