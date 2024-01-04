import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userData = await this.usersService.fetchUserData(req.body.email);
    
    if (userData) return false;

    req.body.password = await bcrypt.hash(req.body.password, 10);
    return true;
  }
}