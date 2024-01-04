import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import { JwtPayload, Secret } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class verifyToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];      
      const { email, id } = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret,
      ) as JwtPayload;
      req.body = { email, token, id };
      next();
    } else {
      return res.status(409).send({ success: false, msg: 'invalid token' });
    }
  }
}

@Injectable()
export class loginMiddileware implements NestMiddleware {
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
