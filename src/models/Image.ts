import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './Order';

@Table({
  timestamps: true,
  tableName: 'images',
})
export class Image extends Model {
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl!: string;  

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;  

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId!: number;  

  @BelongsTo(() => Order)
  order!: Order;
}
