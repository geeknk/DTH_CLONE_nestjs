import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/enitites/user.entities';
import { Repository } from 'typeorm';
import * as jwt from "jsonwebtoken"


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(id:number): Promise<User> {
    return this.usersRepository.findOne({where:{id}});
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
  
  async registerUser(user:User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
  
  async loginUser(user:User): Promise<string> {
    const accessToken = await this.token(user)
    return accessToken
  }
  
  async fetchUserData(email: string) : Promise<User>{
    return await this.usersRepository.findOne({where:{email}})
  };
  
  async getAllSubscription(id: number) : Promise<User>{
    return await this.usersRepository.findOne({
      where:{id},
      relations: {
        subscribe: true,
      },
    })
  };

  async token (userData:User) {
    const accessToken = jwt.sign(
      { email: userData.email, id: userData.id, username: userData.username },
      process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );
    return accessToken
  }
}
