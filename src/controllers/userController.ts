import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const parsedLimit = parseInt(limit as string, 10) || 10;
  const parsedPage = parseInt(page as string, 10) || 1;
  const offset = (parsedPage - 1) * parsedLimit;
  const search = req.query || '';

  try {
    let whereClause: any = [
      { deleted: false }
    ]

    if (search) {
      whereClause.push({
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ]
      });
    }

    const { count, rows: users } = await User.findAndCountAll(({
      where: whereClause,
      parsedLimit,
      offset
    }) as any);

    res.status(200).json({
      data: users,
      totalPages: Math.ceil(count / parsedLimit),
      currentPage: parsedPage,
      totalItems: count
    })
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
    return;
  }
}

export const createUser = async (req: Request, res: Response) => {
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
    })

    res.status(200).json(newUser);
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
    return;
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const updatedUser = await User.update({
      name,
      email,
      role
    }, { where: { id} } );

    res.status(200).json(updatedUser);
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await User.update({
      deleted: true
    }, { where: { id } });

    res.status(200).json({ message: 'Usuario borrado' });
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Server error' });
    return;
  }
}