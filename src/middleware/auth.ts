import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import { JwtPayload, Secret } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import * as env from 'dotenv'
env.config()

@Injectable()
export class TokenVerification implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {     
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret) as JwtPayload;

      req[`data`] = decoded
      
      next();
    } else {
      return res.status(409).send({ success: false, msg: 'invalid token' });
    }
  }
}

@Injectable()
export class LoginMiddileware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    
    const userData = await this.usersService.fetchUserData(req.body.email);

    if (userData == null)
      return res.status(403).send('user not found please register first');
      
    if (!(await bcrypt.compare(req.body.password, userData.password)))
      return res.status(404).send('email or password does not match');

    req.body.id = userData.id;
    req.body.username = userData.username;

    next()
  }
}

@Injectable()
export class IsOperator implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    
    const userData = await this.usersService.fetchUserData(req[`data`].email)

    const role = +process.env.OPERATER

    if (userData.role == role) return next()

    res.status(401).send("Unauthorized")
  }
}