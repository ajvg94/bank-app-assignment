import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import Account from './accounts.model'

@Table({
  tableName:'Transactions',
  modelName: 'Transaction',
  timestamps: true
})
export default class Transaction extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.TEXT
  })
  type!: string;
  
  @Column({
    type: DataType.DOUBLE
  })
  amount!: number;
  
  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @BelongsTo(() => Account, 'accountId')
  account!: Account;
}