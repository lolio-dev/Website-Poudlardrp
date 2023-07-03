import { AxiosResponse } from 'axios';

import { CartItem } from '../../../types/model/CartItem';
import { Carts } from '../../../types/model/Carts';
import { ApiService } from '../../api.service';

import { CartDto } from './dtos/cart.dto';
import { CreateCartResultDto } from './dtos/create-cart.result.dto';
import { UpdateCartResultDto } from './dtos/update-cart.result.dto';

export class CartService {
  /**
   * @summary (Get) `/cart/:userId  `
   */
  static async getCartsFromUser(): Promise<Carts> {
    const response = await ApiService.request<Carts>(`/cart/`, 'GET');

    ApiService.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Patch) `/cart/:cartId`
   */
  static async updateCart(cartId: string, newQuantity: number): Promise<UpdateCartResultDto> {
    const response = await ApiService.request<UpdateCartResultDto>(
      `/cart/${cartId}`,
      'PATCH',
      {},
      {
        data: {
          quantity: newQuantity,
        },
      }
    );

    ApiService.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Post) `/cart`
   */
  static async createNewCart(cartItem: CartDto): Promise<CreateCartResultDto> {
    const response = await ApiService.request<CreateCartResultDto>(
      '/cart',
      'POST',
      { ContentType: 'application/json' },
      {
        data: cartItem,
      }
    );

    ApiService.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Delete) `/cart/:cartId`
   */
  static async deleteCart(cartId: string): Promise<AxiosResponse> {
    const response = await ApiService.request<CartItem[]>(`/cart/${cartId}`, 'DELETE');

    ApiService.validateStatus(response);

    return response;
  }

  /**
   * @summary (Get) `/cart/total`
   */
  static async getTotalCartsQuantity(): Promise<number> {
    const response = await ApiService.request<number>('/cart/total', 'GET');

    ApiService.validateStatus(response);

    return response.data;
  }
}
