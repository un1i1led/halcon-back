import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Customer } from './Customer';
import { Image } from './Image';

@Table({
  timestamps: true,
  tableName: 'orders'
})
export class Order extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  deliveryAddress!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes!: string;

  @Column({
    type: DataType.ENUM('Ordered', 'In process', 'In route', 'Delivered'),
    allowNull: false,
    defaultValue: 'Ordered'
  })
  status!: 'Ordered' | 'In process' | 'In route' | 'Delivered';

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  customerNumber!: string;

  @BelongsTo(() => Customer, {
    foreignKey: 'customerNumber',
    targetKey: 'customerNumber'
  })
  customer!: Customer;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  deleted!: boolean;

  @HasMany(() => Image)
  images!: Image[];
}
