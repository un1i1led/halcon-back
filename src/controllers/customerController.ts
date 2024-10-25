import { Request, Response } from 'express';
import { Customer } from "../models/Customer";
import { Op } from 'sequelize';

export const getAllCustomers = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const parsedLimit = parseInt(limit as string, 10) || 10;
  const parsedPage = parseInt(page as string, 10) || 1;
  const offset = (parsedPage - 1) * parsedLimit;
  const search = req.query.search || '';


  try {
    let whereClause: any = [
      { deleted: false }
    ]

    if (search) {
      whereClause.push({
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` }},
          { fiscalData: { [Op.like]: `%${search}%` }},
          { address: { [Op.like]: `%${search}%` }},
          { customerNumber: { [Op.like]: `%${search}%` }}
        ]
      });
    }

    const { count, rows: customers } = await Customer.findAndCountAll(({
      where: whereClause,
      parsedLimit,
      offset
    }) as any);

    res.status(200).json({
      data: customers,
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

export const createCustomer = async (req: Request, res: Response) => {
  const { name, fiscalData, address, phone } = req.body;

  try {
    const existingCustomer = await Customer.findOne({ where: { name } });
    if (existingCustomer) {
      res.status(400).json({ message: 'Cliente ya existe' });
      return;
    }

    const newCustomer = await Customer.create({
      name, 
      fiscalData,
      address,
      phone
    });

    res.status(200).json(newCustomer);
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
    return;
  }
}

export const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, fiscalData, address, phone } = req.body;

  try {
    const updatedCustomer = await Customer.update({
      name,
      fiscalData,
      address,
      phone
    }, { where: { id } })

    res.status(200).json(updatedCustomer);
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Server error' });
    return;
  }
} 

export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Customer.update({
      deleted: true
    }, { where: { id } });

    res.status(200).json({ message: 'Cliente borrado' });
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Server error' });
    return;
  }
}