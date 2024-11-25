import express from 'express';
import path from 'path';
import sequelize from './config/database';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import cors from 'cors';

config();  

const app = express();
app.use(express.json());  
app.use(cors())

app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;


if (process.env.NODE_ENV !== 'production') {
  sequelize.sync({ force: false })
    .then(() => {
      console.log('Database synced successfully!');
    })
    .catch((error) => {
      console.error('Failed to sync database:', error);
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
