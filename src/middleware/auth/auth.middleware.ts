import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

// auth middleware checking for valid token in authorization header
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const decoded = verify(token, process.env.JWT_SECRET as string);
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
