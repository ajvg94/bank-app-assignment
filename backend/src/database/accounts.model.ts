import {Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import Transaction from './transactions.model';

@Table({
  tableName:'Accounts',
  modelName: 'Account',
  timestamps: true,
})
export default class Account extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.TEXT
  })
  name!: string;

  @Column({
    type: DataType.DOUBLE
  })
  currentBalance!: number;

  @Column({
    type: DataType.DOUBLE
  })
  initialBalance!: number;

  @HasMany(() => Transaction, 'accountId')
  transactions?: Transaction[];
}