import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from '../../types/UUID';
import { PartnerCodeDto } from './dto/partner_code.dto';
import { PartnerCodeSchema } from './entity/partner_code.schema';
import { CreatePartnerCodeDto } from './dto/create-partner_code.dto';
import StripeHelper from '../payments/StripeHelper';

@Injectable()
export class PartnerCodeService {
  constructor(
    @InjectRepository(PartnerCodeSchema)
    private partnerCodeRepository: Repository<PartnerCodeSchema>
  ) {}

  async create(code: CreatePartnerCodeDto) {
    const current = await this.findOne(code.codeId);

    if (current) {
      throw new HttpException('PARTNER_CODE_EXISTS', HttpStatus.BAD_REQUEST);
    }

    const couponId = await new StripeHelper().createCoupon(code.discount, code.codeId);

    return this.partnerCodeRepository.save({
      ...code,
      discount_stripe_id: couponId,
      status: 'ACTIVE',
    });
  }

  changeStatus(codeId: string, status: string) {
    return this.partnerCodeRepository.update(codeId, { status });
  }

  findOne(codeId): Promise<PartnerCodeDto | undefined> {
    return this.partnerCodeRepository.findOne({ where: { status: 'ACTIVE', codeId } });
  }

  findAll(): Promise<PartnerCodeDto[]> {
    return this.partnerCodeRepository.find();
  }

  async findAllFromUuid(uuid: UUID): Promise<PartnerCodeDto[]> {
    return await this.partnerCodeRepository.find({
      where: { uuid: uuid },
    });
  }
}
