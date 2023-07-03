import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile/profile.module';
import { PartnerCodeSchema } from './entity/partner_code.schema';
import { PartnerCodeController } from './partner_code.controller';
import { PartnerCodeService } from './partner_code.service';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerCodeSchema]), forwardRef(() => ProfileModule)],
  controllers: [PartnerCodeController],
  providers: [PartnerCodeService],
  exports: [PartnerCodeService, TypeOrmModule],
})
export class PartnerCodeModule {}
