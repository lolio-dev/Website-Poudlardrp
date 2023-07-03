import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { InvoiceProductSchema } from './entity/invoice_product.schema';
import { GemsService } from '../gems/gems.service';
import { ProductsService } from '../products/products.service';
import { invoicesProductToFullDto } from './dto/invoice_product.adaptater';
import { CreateInvoiceProductDto, InvoiceProductDto } from './dto/invoice_product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InvoiceProductService {
  constructor(
    @InjectRepository(InvoiceProductSchema)
    private invoiceProductRepository: Repository<InvoiceProductSchema>,
    private readonly gemService: GemsService,

    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService
  ) {}

  async create(createInvoicesProductDto: CreateInvoiceProductDto): Promise<InvoiceProductDto> {
    const gemId = createInvoicesProductDto.gemId || null;
    const productId = createInvoicesProductDto.productId || null;

    const priceEuro = gemId ? (await this.gemService.findOne(gemId)).price : 0;
    const priceGem = !productId ? 0 : (await this.productService.findOne(productId)).price;

    const savedInvoices = await this.invoiceProductRepository.save({
      id: uuidv4(),
      productId,
      gemId,
      priceEuro,
      priceGem,
      ...createInvoicesProductDto,
    });
    return invoicesProductToFullDto(savedInvoices);
  }

  async findAll(): Promise<InvoiceProductDto[]> {
    const invoices: InvoiceProductSchema[] = await this.invoiceProductRepository.find();

    return invoices ? invoices.map(n => invoicesProductToFullDto(n)) : undefined;
  }

  async findAllFromInvoicesId(id: string): Promise<InvoiceProductSchema[]> {
    return await this.invoiceProductRepository.find({
      where: { invoiceId: id },
    });
  }

  async update(
    id: string,
    updateInvoiceProductDto: Partial<CreateInvoiceProductDto>
  ): Promise<UpdateResult> {
    return this.invoiceProductRepository.update(id, {
      ...updateInvoiceProductDto,
    });
  }
}
