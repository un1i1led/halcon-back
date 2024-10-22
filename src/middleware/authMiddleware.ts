import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../src/models/User';

export interface AuthRequest extends Request {
  user?: any;
}

const isAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'No token provided, authorization denied.' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      res.status(401).json({ message: 'Invalid token, authorization denied.' });
      return;
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid, authorization denied.' });
  }
};

export default isAuthenticated;
