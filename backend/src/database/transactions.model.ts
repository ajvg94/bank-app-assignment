import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import AccountModel from './accounts.model'

@Table({
  tableName:'Transactions',
  modelName: 'Transaction',
  timestamps: true
})
export default class TransactionModel extends Model {
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
  
  @ForeignKey(() => AccountModel)
  @Column
  accountId!: number;

  @BelongsTo(() => AccountModel, 'accountId')
  account!: AccountModel;
}