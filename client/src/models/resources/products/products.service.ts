import { Product } from '../../../types/model/Product';
import { ApiService } from '../../api.service';

export class ProductsService {
  /**
   * @summary (GET) `/products`
   */
  static async getProducts(): Promise<Product[]> {
    const response = await ApiService.request<Product[]>('/products', 'GET');

    ApiService.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (GET) `/products/:id`
   */
  static async getProductById(productId: string): Promise<Product> {
    const response = await ApiService.request<Product>(`/products/${productId}`, 'GET');

    ApiService.validateStatus(response);

    return response.data;
  }

  static async getSimilarProducts(productId: string, limit = 4): Promise<Product[]> {
    const response = await ApiService.request<Product[]>(
      `/products/${productId}/similar?limit=${limit}`,
      'GET'
    );

    ApiService.validateStatus(response);

    return response.data;
  }
}
