import { TransactionsSchema } from '../entity/transactionsSchema';
import { TransactionsDto } from './transactions.dto';

export function transactionToDto(transaction: TransactionsSchema): TransactionsDto {
  return { ...transaction };
}

export function dtoToTransactions(transaction: TransactionsDto): TransactionsSchema {
  return { ...transaction };
}
