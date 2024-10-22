import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'users'
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.ENUM('admin', 'sales', 'purchasing', 'warehouse', 'route'),
    allowNull: false,
  })
  role!: 'admin' | 'sales' | 'purchasing' | 'warehouse' | 'route';

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  deleted!: boolean;
}
