import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionsSchema } from './entity/transactionsSchema';
import { UUID } from '../../types/UUID';
import { InvoicesService } from '../invoices/invoices.service';
import { transactionToDto } from './dto/transactions.adaptater';
import { CreateTransactionsDto, TransactionsDto } from './dto/transactions.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsSchema)
    private transactionsRepository: Repository<TransactionsSchema>,

    private readonly invoicesService: InvoicesService
  ) {}

  /**
   * Create a transaction  in the DB
   * @param createTransactionDto
   * @returns The transaction created
   */
  async create(createTransactionDto: CreateTransactionsDto): Promise<TransactionsDto> {
    const invoice = await this.invoicesService.findOne(createTransactionDto.invoiceId);
    const priceEuro = invoice.priceEuro;
    const currency = priceEuro !== 0 ? 'euro' : 'gem';

    const savedTransaction = await this.transactionsRepository.save({
      transactionsId: uuidv4(),
      uuid: invoice.uuid,
      price: currency === 'euro' ? priceEuro : invoice.priceGems,
      currency,
      ...createTransactionDto,
    });
    return transactionToDto(savedTransaction);
  }

  /**
   * Find all the transactions
   * @returns Return all the transactions in the DB
   */
  async findAll(): Promise<TransactionsDto[]> {
    const transactions: TransactionsSchema[] = await this.transactionsRepository.find();

    return transactions ? transactions.map(n => transactionToDto(n)) : undefined;
  }

  /**
   * Find all transactions fromprofileid
   * @param idprofileid
   * @returns all transactions fromprofileid
   */
  async findAllFromUuid(uuid: UUID): Promise<TransactionsSchema[]> {
    const transactions: TransactionsSchema[] = await this.transactionsRepository.find({
      where: { uuid: uuid },
    });

    return transactions;
  }
}
