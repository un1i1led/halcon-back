import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import { User } from '../models/User';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';
import { Image } from '../models/Image';

config();  

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  models: [User, Customer, Order, Image],  
});

export default sequelize;
