import { Table, Column, Model, DataType, BeforeCreate, HasMany } from 'sequelize-typescript';
import { Order } from './Order';

@Table({
  timestamps: true,
  tableName: 'customers',
})
export class Customer extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  fiscalData!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  customerNumber!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  deleted!: boolean;

  @HasMany(() => Order, {
    foreignKey: 'customerNumber',
    sourceKey: 'customerNumber'
  })
  orders!: Order[];

  @BeforeCreate
  static async generateCustomerNumber(customer: Customer) {
    customer.customerNumber = `${Math.floor(100000 + Math.random() * 900000)}`;
  }
}