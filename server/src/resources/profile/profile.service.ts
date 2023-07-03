import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { InvoiceProductSchema } from '../invoice_product/entity/invoice_product.schema';
import { Role } from '../../types/enums/role.enum';
import { Status } from '../../types/enums/status.enum';
import { UUID } from '../../types/UUID';
import { MailServices } from '../../utils/mails/mailService';
import { generateVerifyEmailTemplate } from '../../utils/mails/templates/verifyEmail';
import { arrayToMarkdown, profileToMarkdown } from '../../utils/markdown/adapter';
import { CartService } from '../cart/cart.service';
import { InvoicesService } from '../invoices/invoices.service';
import { InvoiceProductService } from '../invoice_product/invoice_product.service';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateProfileDto } from './dto/profile.dto';
import { ProfileSchema } from './entity/profile.schema';
import { bearer_email_secret } from '../../../config/constants';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PartnerCodeService } from '../partner_code/partner_code.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileSchema)
    private repository: Repository<ProfileSchema>,
    private jwtService: JwtService,
    private transactionsService: TransactionsService,
    private invoiceProductService: InvoiceProductService,
    private partnerCodeService: PartnerCodeService,
    @Inject(forwardRef(() => CartService))
    private cartService: CartService,
    @Inject(forwardRef(() => InvoicesService))
    private invoicesService: InvoicesService
  ) {}

  private async isMailExist(email: string): Promise<boolean> {
    const profile = await this.findOneByEmail(email);
    return !!profile;
  }

  public async sendEmailValidation(profile: ProfileSchema) {
    const token = this.jwtService.sign({ email: profile.email }, { secret: bearer_email_secret() });
    const mailService = new MailServices().getTransporter();

    mailService.sendMail({
      from: 'no-reply@poudlardrp.fr',
      to: profile.email,
      subject: 'Email Validation',
      html: generateVerifyEmailTemplate(token),
    });

    this.repository.save({ ...profile, sendAt: new Date() });

    return true;
  }

  public async findByQuery(query: FindManyOptions<ProfileSchema>) {
    return this.repository.find(query);
  }

  public async findOne(uuid: UUID): Promise<ProfileSchema> {
    return this.repository.findOne({ where: { uuid } });
  }

  public async findOneByEmail(email: string): Promise<ProfileSchema> {
    return this.repository.findOne({ where: { email } });
  }

  public async create(createProfileDto: CreateProfileDto): Promise<ProfileSchema> {
    const profile = await this.findOne(createProfileDto.uuid);

    if (profile && profile.email === createProfileDto.email) {
      return profile;
    }

    return this.repository.save({
      ...createProfileDto,
      role: profile?.role || Role.USER,
      status: Status.VERIFIED,
      gems: 0,
    });
  }

  public async registerEmail(uuid: UUID, email: string) {
    const isMailExist = await this.isMailExist(email);

    if (isMailExist) {
      throw new HttpException('errors.email_already_exist', HttpStatus.CONFLICT);
    }

    const profile = await this.repository.save({
      uuid,
      email,
      status: Status.UNVERIFIED,
      role: Role.INACTIVE,
      updatedAt: new Date(),
    });

    return this.sendEmailValidation(profile);
  }

  public async verifyEmail(token: string) {
    let payload;

    try {
      payload = await this.jwtService.verifyAsync(token, { secret: bearer_email_secret() });

      const profile = await this.findOneByEmail(payload.email);

      await this.repository.save({
        uuid: profile.uuid,
        role: profile.role === Role.INACTIVE ? Role.USER : profile.role,
        status: Status.VERIFIED,
      });

      return this.findOne(profile.uuid);
    } catch (error) {
      throw new HttpException('errors.invalid_token', HttpStatus.UNAUTHORIZED);
    }
  }

  public async getUsername(uuid: UUID): Promise<string> {
    const response = await axios.get(
      `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
    );
    return response.data.name;
  }

  public async addGems(uuid: UUID, count: number) {
    const profile = await this.findOne(uuid);
    this.repository.save({
      ...profile,
      gems: profile.gems + count,
    });
  }

  public async substractGems(uuid: UUID, count: number) {
    const profile = await this.findOne(uuid);
    this.repository.save({
      ...profile,
      gems: profile.gems - count,
    });
  }

  public async getDatas(profile: ProfileSchema): Promise<string> {
    const cart = await this.cartService.findAllFromUuid(profile.uuid);
    const invoices = await this.invoicesService.findAllFromUuid(profile.uuid);
    const transactions = await this.transactionsService.findAllFromUuid(profile.uuid);

    let content = `Created on ${new Date().toString()}\r\n`;
    content += `# Datas\r\n${profileToMarkdown(profile)}\r\n${arrayToMarkdown(
      'Cart',
      cart
    )}\r\n${arrayToMarkdown('Invoices', invoices)}\r\n${arrayToMarkdown(
      'Transactions',
      transactions
    )}`;

    return content;
  }

  public async archive(uuid: UUID): Promise<void> {
    await this.repository.update(uuid, {
      email: '',
      uuid: uuidv4(),
      role: Role.INACTIVE,
      gems: 0,
      status: Status.ARCHIVED,
      stripeId: '',
    });
  }

  public async getNumberOfProductBought(productId, uuid) {
    const invoices = await this.invoicesService.findAllFromUuid(uuid);
    let quantity = 0;
    let invoiceProducts: InvoiceProductSchema[] = [];

    for (const invoice of invoices) {
      const invoiceProduct = await this.invoiceProductService.findAllFromInvoicesId(
        invoice.invoicesId
      );
      invoiceProducts.push(...invoiceProduct);
    }

    invoiceProducts = invoiceProducts.filter(
      (invoiceProduct: InvoiceProductSchema) => invoiceProduct.productId == productId
    );
    invoiceProducts.forEach(
      (invoiceProduct: InvoiceProductSchema) => (quantity += invoiceProduct.quantity)
    );

    return quantity;
  }

  public async updateProfile(uuid: UUID, updatedProfile: Partial<ProfileSchema>) {
    return this.repository.update(uuid, updatedProfile);
  }

  public async getPartnerSolde(uuid: UUID, startAt: string, endAt: string) {
    const partnerCodes = await this.partnerCodeService.findAllFromUuid(uuid);
    const soldes = await Promise.all(
      partnerCodes
        .filter(pc => pc.status === 'ACTIVE')
        .map(async pc => await this.getCodeSolde(pc, startAt, endAt))
    );

    return soldes.reduce((previous, solde) => previous + solde, 0).toFixed(2);
  }

  public async getAllPartnerSoldes(startAt: string, endAt: string) {
    const codes = await this.partnerCodeService.findAll();
    return Promise.all(
      codes.map(async code => ({
        solde: await this.getCodeSolde(code, startAt, endAt),
        code: {
          ...code,
          uuid: code.uuid,
        },
      }))
    ).then(soldes =>
      soldes.reduce(
        (acc, { solde, code: { codeId, percentage, uuid } }) => ({
          ...acc,
          [uuid]: {
            total: (acc[uuid]?.total || 0) + solde,
            codes: [...(acc[uuid]?.codes || []), { codeId, percentage, solde }],
          },
        }),
        {}
      )
    );
  }

  private async getCodeSolde(code, startAt, endAt) {
    const invoices = await this.invoicesService.findByQuery({
      where: {
        status: 'Paid',
        codeId: code,
        paidAt: Between(startAt, endAt),
      },
    });

    return invoices.reduce((previous, invoice) => previous + this.applyPercentage(parseFloat(invoice.priceEuro.toString()), code.percentage), 0);
  }

  private applyPercentage(value: number, percentage: number) {
    return percentage < 1 ? value * percentage : value * (percentage / 100);
  }
}
