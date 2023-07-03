import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cartsToTotalPrice } from './adapters/cart.adapter';
import { ProductsService } from '../products/products.service';
import { ProfileService } from '../profile/profile.service';
import { UUID } from '../../types/UUID';
import { CartSchema } from './entity/cart.schema';
import { CreateCartDto } from './dtos/create-cart.dto';
import { UpdateCartResult } from './dtos/update-cart.result';
import { CreateCartResultDto } from './dtos/create-cart.result.dto';
import { CartsDto } from './dtos/carts.dto';
import { FullCartDto } from './dtos/full-cart.dto';
import { DeleteCartResultDto } from './dtos/delete-cart.result.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartSchema)
    private cartRepository: Repository<CartSchema>,
    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService
  ) {}

  async create(
    cartToAdd: CreateCartDto,
    uuid: UUID
  ): Promise<CreateCartResultDto | UpdateCartResult> {
    const newCart = { ...cartToAdd, cartId: uuidv4(), uuid: uuid };
    let cart = await this.cartRepository.findOne({
      where: { uuid: uuid, productId: cartToAdd.productId },
    });
    let product = await this.productsService.findOne(cartToAdd.productId || cart.productId, uuid);

    if (cart) {
      return await this.update(
        cart.cartId,
        {
          ...cart,
          quantity: cart.quantity + cartToAdd.quantity,
        },
        uuid
      );
    }

    if (!this.canAddOrUpdateCart(cartToAdd.quantity + product.quantityOwned, product.maximum)) {
      throw new InternalServerErrorException('Max quantity');
    }

    cart = await this.cartRepository.save(newCart);
    product = await this.productsService.findOne(cartToAdd.productId, uuid);

    return {
      result: cart,
      isAvailable: product.isAvailable,
      quantityAvailable: product.quantityAvailable,
      quantityOwned: product.quantityOwned,
    };
  }

  async findAll() {
    return await this.cartRepository.find();
  }

  async findDetailledsCarts(uuid: UUID): Promise<CartsDto> {
    const carts = await this.getDetailledsCarts(uuid);

    return {
      totalPrice: cartsToTotalPrice(carts),
      carts,
    };
  }

  async getDetailledsCarts(uuid: UUID): Promise<FullCartDto[]> {
    const carts = await this.findAllFromUuid(uuid);

    return await Promise.all(
      carts.map(async cart => ({
        uuid: cart.uuid,
        quantity: cart.quantity,
        cartId: cart.cartId,
        product: await this.productsService.findOne(cart.productId, uuid),
      }))
    );
  }

  async findAllFromUuid(uuid: UUID): Promise<CartSchema[]> {
    return await this.cartRepository.find({
      where: { uuid: uuid },
    });
  }

  async findOneFromUuidAndProduct(uuid: UUID, productId: string): Promise<CartSchema> {
    return await this.cartRepository.findOne({
      where: { uuid: uuid, productId: productId },
    });
  }

  async findOne(id: string): Promise<CartSchema> {
    return await this.cartRepository.findOne({ where: { cartId: id } });
  }

  async update(id: string, cart: Partial<CartSchema>, uuid: UUID): Promise<UpdateCartResult> {
    const actualCart = await this.findOne(id);

    if (!actualCart) {
      throw new NotFoundException('Cart not found');
    }

    let product = await this.productsService.findOne(actualCart.productId, uuid);

    const objectsBought = await this.profileService.getNumberOfProductBought(
      actualCart.productId,
      uuid
    );

    if (!this.canAddOrUpdateCart(objectsBought + cart.quantity, product.maximum)) {
      throw new InternalServerErrorException('Max quantity');
    }

    const updateResult = await this.cartRepository.update(id, { ...cart });

    const carts = await this.getDetailledsCarts(uuid);

    product = await this.productsService.findOne(actualCart.productId, uuid);

    return {
      result: updateResult,
      totalPrice: cartsToTotalPrice(carts),
      totalCartPrice: product.price * cart.quantity,
      isAvailable: product.isAvailable,
      quantityAvailable: product.quantityAvailable,
      quantityOwned: product.quantityOwned,
    };
  }

  async delete(id: string, uuid: UUID): Promise<DeleteCartResultDto> {
    const deleteResult = await this.cartRepository.delete(id);

    const carts = await this.getDetailledsCarts(uuid);

    return {
      deleteResult: deleteResult,
      newPrice: cartsToTotalPrice(carts),
    };
  }

  async getTotalCartsQuantity(uuid: UUID): Promise<number> {
    const carts = await this.findAllFromUuid(uuid);
    let total: number = 0;

    carts.forEach((cart: CartSchema) => (total += cart.quantity));

    return total;
  }

  private canAddOrUpdateCart(quantity: number, maximum: number) {
    return quantity >= 0 && (maximum === -1 || quantity <= maximum);
  }
}
