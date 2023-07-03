import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { InvoicesSchema } from './entity/invoices.schema';
import { UUID } from '../../types/UUID';
import { ProfileService } from '../profile/profile.service';
import { InvoicesCreateDto, InvoicesDto } from './dto/invoices.dto';
import { invoicesToFullDto } from './dto/invoicesAdaptater';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(InvoicesSchema)
    private invoicesRepository: Repository<InvoicesSchema>,

    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService
  ) {}

  async create(createInvoicesDto: InvoicesCreateDto): Promise<InvoicesDto> {
    const profile = await this.profileService.findOne(createInvoicesDto.uuid);

    const newInvoices: InvoicesSchema = {
      ...createInvoicesDto,
      ...profile,
      invoicesId: uuidv4(),
      priceEuro: createInvoicesDto.priceEuro,
      emitedAt: new Date(),
      paidAt: null,
      status: 'Waiting',
    };

    const savedInvoices = await this.invoicesRepository.save(newInvoices);
    return invoicesToFullDto(savedInvoices);
  }

  async findAll(): Promise<InvoicesDto[]> {
    const invoices: InvoicesSchema[] = await this.invoicesRepository.find();

    return invoices ? invoices.map(n => invoicesToFullDto(n)) : undefined;
  }

  async findOne(id: string): Promise<InvoicesDto> {
    const news: InvoicesSchema = await this.invoicesRepository.findOne({
      where: { invoicesId: id },
    });

    return news ? invoicesToFullDto(news) : undefined;
  }

  async findAllFromUuid(uuid: UUID): Promise<InvoicesDto[]> {
    const invoices: InvoicesSchema[] = await this.invoicesRepository.find({
      where: { uuid: uuid },
    });

    return invoices ? invoices.map(n => invoicesToFullDto(n)) : undefined;
  }

  async update(id: string, updateInvoicesDto: Partial<InvoicesDto>): Promise<UpdateResult> {
    return this.invoicesRepository.update(id, { ...updateInvoicesDto });
  }

  async findByQuery(query: FindManyOptions<InvoicesSchema>) {
    return this.invoicesRepository.find(query)
  }
}
