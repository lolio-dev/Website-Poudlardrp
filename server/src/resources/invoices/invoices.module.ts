import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesSchema } from './entity/invoices.schema';
import { ProfileModule } from '../profile/profile.module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvoicesSchema]), forwardRef(() => ProfileModule)],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService, TypeOrmModule],
})
export class InvoicesModule {}
