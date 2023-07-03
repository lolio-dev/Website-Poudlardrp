import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsSchema } from './entity/transactionsSchema';
import { InvoicesModule } from '../invoices/invoices.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionsSchema]), InvoicesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService, TypeOrmModule],
})
export class TransactionsModule {}
