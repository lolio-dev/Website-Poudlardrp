import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ProductSchema } from './entity/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { createProductDtoToProduct, productToFullDto } from './products.adapter';
import { Status } from '../../types/enums/status.enum';
import { intersection } from 'lodash';
import { CartService } from '../cart/cart.service';
import { FilesService } from '../files/files.service';
import { ProfileService } from '../profile/profile.service';
import { UUID } from '../../types/UUID';
import { ProductStatus } from '../../types/enums/productStatus.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductSchema)
    private productRepository: Repository<ProductSchema>,
    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
    @Inject(forwardRef(() => CartService))
    private cartService: CartService,
    private filesService: FilesService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductSchema> {
    const newProduct: ProductSchema = createProductDtoToProduct(createProductDto);

    return await this.productRepository.save(newProduct);
  }

  async findOne(productId: string, uuid?: UUID): Promise<ProductDto> {
    const product: ProductSchema = await this.productRepository.findOne({
      where: { productId: productId },
    });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return this.productToFullProduct(product, uuid);
  }

  async findAll(uuid?: UUID): Promise<ProductDto[]> {
    const products: ProductSchema[] = await this.productRepository.find({
      where: { status: ProductStatus.ENABLE },
      order: { productId: 'DESC' },
    });
    return products ? this.productsToFullProducts(products, uuid) : undefined;
  }

  async findSimilar(
    id: string,
    limit: number | undefined,
    excludeBoughtProducts: boolean | undefined,
    uuid?: UUID
  ): Promise<any> {
    excludeBoughtProducts = uuid ? excludeBoughtProducts : false;

    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Product not found' },
        HttpStatus.NOT_FOUND
      );

    const categoryProducts: ProductSchema[] = await this.productRepository.find({
      where: { category: product.category, status: ProductStatus.ENABLE },
    });

    let products = await this.productsToFullProducts(categoryProducts, uuid);
    products = products.filter(product => product.productId != id);

    if (excludeBoughtProducts)
      products = products.filter(
        product => product.quantityAvailable === null || product.quantityAvailable > 0
      );

    return products
      .sort((a, b) => {
        const aScore =
          intersection(product.tags.split(';'), a.tags).length +
          (a.rarity === product.rarity ? 1 : 0);
        const bScore =
          intersection(product.tags.split(';'), b.tags).length +
          (b.rarity === product.rarity ? 1 : 0);
        return bScore - aScore;
      })
      .slice(0, limit);
  }

  async update(id: string, updateProductDto: Partial<ProductDto>): Promise<UpdateResult> {
    return this.productRepository.update(id, {
      ...updateProductDto,
      tags: updateProductDto.tags.join(';'),
    });
  }

  async archive(id: string): Promise<UpdateResult> {
    // TODO Migration vers this.productService.findOne(id);

    const product = await this.productRepository.findOneBy({ productId: id });

    if (!product)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Product not found' },
        HttpStatus.NOT_FOUND
      );

    return this.productRepository.update(id, { status: Status.ARCHIVED });
  }

  async unarchive(id: string): Promise<UpdateResult> {
    // TODO Migration vers this.productService.findOne(id);

    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Product not found' },
        HttpStatus.NOT_FOUND
      );

    return this.productRepository.update(id, {
      status: ProductStatus.ENABLE,
    });
  }

  private async productsToFullProducts(products, uuid?): Promise<ProductDto[]> {
    const newProducts: ProductDto[] = [];

    for (const product of products) {
      newProducts.push(await this.productToFullProduct(product, uuid));
    }

    return newProducts;
  }

  private async productToFullProduct(product: ProductSchema, uuid?): Promise<ProductDto> {
    let quantityOwned: number = null;
    let inCartQuantity = 0;

    const isModelExisting: boolean = product.model
      ? this.filesService.isFileExisting('models/' + product.model)
      : false;

    if (uuid) {
      quantityOwned = await this.profileService.getNumberOfProductBought(product.productId, uuid);
      const cart = await this.cartService.findOneFromUuidAndProduct(uuid, product.productId);
      if (cart) {
        inCartQuantity = cart.quantity;
      }
    }

    return productToFullDto(product, quantityOwned, inCartQuantity, isModelExisting);
  }
}
