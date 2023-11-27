import {Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import TransactionModel from './transactions.model';

@Table({
  tableName:'Accounts',
  modelName: 'Account',
  timestamps: true,
})
export default class AccountModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    unique: true
  })
  accountNumber!: number;

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

  @HasMany(() => TransactionModel, 'accountId')
  transactions?: TransactionModel[];
}