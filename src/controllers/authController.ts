import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Usuario ya existe' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name, 
      email,
      password: hashedPassword,
      role
    });

    const tokenPayload = {
      id: newUser.id,
      role: newUser.role,
      name: newUser.name,
      email: newUser.email
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.status(200).json(newUser);
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message })
    return;
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Credenciales invalidas' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Credenciales invalidas' });
      return;
    }

    const tokenPayload = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: tokenPayload
    });
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    return;
  }
};