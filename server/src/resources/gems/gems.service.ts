import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGemDto } from './dto/create-gem.dto';
import { UpdateGemDto } from './dto/update-gem.dto';
import { GemMapper } from './gem.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { GemSchema } from './entity/gem.schema';
import { Repository } from 'typeorm';
import { GemFullDto } from './dto/gem-full.dto';
import StripeHelper from '../payments/StripeHelper';
import { Status } from '../../types/enums/status.enum';
import { ProductStatus } from '../../types/enums/productStatus.enum';

@Injectable()
export class GemsService {
  private gemMapper: GemMapper;
  constructor(
    @InjectRepository(GemSchema)
    private gemRepository: Repository<GemSchema>
  ) {
    this.gemMapper = new GemMapper();
  }

  async create(createGemDto: CreateGemDto): Promise<GemFullDto> {
    const newOffer = new GemSchema();
    const gemDto = new GemFullDto();
    const offerId = createGemDto.gemOfferId;

    const offer = await this.findOne(offerId);
    if (offer)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Offer already exists',
        },
        HttpStatus.BAD_REQUEST
      );

    this.gemMapper.map(createGemDto, newOffer);

    if (!gemDto.stripeId)
      gemDto.stripeId = await new StripeHelper().createProduct(
        gemDto.gems,
        gemDto.bonus,
        gemDto.price
      );

    newOffer.gemOfferId = null;
    const savedOffer = await this.gemRepository.save(newOffer);
    return this.gemMapper.map(savedOffer, gemDto);
  }

  findAll() {
    return this.gemRepository.find();
  }

  async findOne(id: string) {
    const offer = await this.gemRepository.findOne({
      where: { gemOfferId: id },
    });
    if (!offer)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Offer not found' },
        HttpStatus.NOT_FOUND
      );
    return offer;
  }

  async update(id: string, updateGemDto: UpdateGemDto) {
    const offer = await this.findOne(id);
    if (!offer)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Offer not found' },
        HttpStatus.NOT_FOUND
      );

    //Edit Stripe product if gems, bonus or price change
    if (updateGemDto.gems || updateGemDto.bonus || updateGemDto.price)
      updateGemDto.stripeId = await new StripeHelper().editProduct(updateGemDto, offer);

    return this.gemRepository.update(id, updateGemDto);
  }

  async archive(id: string) {
    const offer = await this.findOne(id);
    if (!offer)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Offer not found' },
        HttpStatus.NOT_FOUND
      );

    //await new StripeHelper().deleteProduct(offer.stripeId);
    return this.gemRepository.update(id, { status: Status.ARCHIVED });
  }

  async unarchive(id: string) {
    const offer = await this.findOne(id);
    if (!offer)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Offer not found' },
        HttpStatus.NOT_FOUND
      );

    const gemDto = new UpdateGemDto();
    gemDto.status = ProductStatus.ENABLE;
    return this.gemRepository.update(id, gemDto);
  }
}
