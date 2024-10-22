import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Order } from '../models/Order';
import { Customer } from '../models/Customer';

export const getAllOrders = async (req: Request, res: Response) => {
  const { page, limit, status } = req.query;
  const parsedLimit = parseInt(limit as string, 10) || 10;
  const parsedPage = parseInt(page as string, 10) || 1;
  const offset = (parsedPage - 1) * parsedLimit;
  const search = req.query || '';

  try {
    let whereClause: any = [
      { deleted: false }
    ];

    if (status !== undefined) {
      whereClause.push({ status });
    }

    if (search) {
      whereClause.push({
        [Op.or]: [
          { id: { [Op.like]: `%${search}%` }},
          { deliveryAddress: { [Op.like]: `%${search}%` }},
          { customerNumber: { [Op.like]: `%${search}%` }},
        ]
      });
    }

    const { count, rows: orders } = await Order.findAndCountAll(({
      where: whereClause,
      parsedLimit,
      offset
    }) as any);

    res.status(200).json({
      data: orders,
      totalPages: Math.ceil(count / parsedLimit),
      currentPage: parsedPage,
      totalItems: count
    })
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
    return;
  }
}

export const createOrder = async (req: Request, res: Response) => {
  const { notes, customerNumber } = req.body;

  try {
    const customer = await Customer.findOne({ where: { customerNumber } });
    if (!customer) {
      res.status(400).json({ message: 'Este cliente no existe' });
    }

    const newOrder = await Order.create({
      deliveryAddress: req.body.deliveryAddress || customer?.address,
      notes,
      customerNumber,
    })

    res.status(200).json(newOrder);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message })
  }
}

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { notes, customerNumber, deliveryAddress } = req.body;

  try {
    const updatedOrder = await Order.update({
      notes,
      customerNumber,
      deliveryAddress
    }, { where: { id } })

    res.status(200).json(updatedOrder);
    return;
  } catch (err: any) {
    res.status(400).json({ message: err.message })
    return;
  }
}

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Order.update({
      deleted: true
    }, { where: { id } });

    res.status(200).json({ message: 'Orden borrado' })
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message })
    return;
  }
}