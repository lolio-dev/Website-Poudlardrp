import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {API_URI} from 'src/constants';
import {loadFromSessionStorage} from '../store';
import {Country} from '../types/Country';
import {News} from '../types/News';
import {User} from '../types/User';
import {UserDto} from './dto/UserDto';
import {CartDto} from './dto/CartDto';
import {Product} from "../types/Product";
import {CartItem} from "../types/CartItem";
import {Transaction} from "../types/Transaction";
import {InvoiceProduct} from '../types/InvoiceProduct';
import { Gems } from '../types/Gems';
import {GemsDto} from "./dto/GemsDto";
import RecoverPasswordDto from "./dto/RecoverPasswordDto";
import { FullCart } from "../types/FullCart";

export class ApiService {
  private static get bearerToken(): string | null {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMThmOWM3OTgtMTZmZi00OWJhLTg4YmEtYjI0MTdmMzRiZjgxIiwiaWF0IjoxNjU2ODQ5MDcxLCJleHAiOjE2NTY5MzU0NzF9.Ws37JvZ7ptkMfMR23lIsv0sLT-ATBw4V_88FqVMAXqE';
  }

  private static async request<T>(
    url: string,
    method: Method = 'GET',
    headers?: Record<string, string>,
    rest?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const token = headers?.Authorization || this.bearerToken;
    return axios
      .request({
        url,
        method,
        baseURL: API_URI,
        headers: {
          Accept: 'application/json',
          AcceptEncoding: 'gzip',
          ...(token && { Authorization: token }),
          ...(headers && headers),
        },
        ...(rest && rest),
        validateStatus: () => true,
      })
      .then((response: AxiosResponse<T>) => {
        const { status, data } = response;

        if (status === 401 || status === 403 || status >= 500) {
          console.error(status, data);
          throw data;
        }

        return response;
      })
      .catch(error => {
        throw error;
      });
  }

  private static validateStatus(response: AxiosResponse, maxValidStatus = 300): void {
    const { status, data } = response;

    if (status >= maxValidStatus) {
      console.error(status, data);
      throw data;
    }
  }

  static async getUUID(username: string) {
    const res = await axios.request(
      {
        url: `https://api.ashcon.app/mojang/v2/user/${username}`,
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    this.validateStatus(res);

    return res.data.uuid;
  }

  static async getPlayerHead(UUID: string) {
    return axios.getUri({url: `https://crafthead.net/avatar/${UUID}`});
  }

  static async getPlayerConnected(): Promise<{ online: number, max: number }> {
    const res = await axios.request(
      {
        url: 'https://api.mcsrvstat.us/2/play.poudlardrp.fr',
        method: 'GET'
      }
    );

    return res.data.players;
  }

  /**
   * @summary (POST) `/auth/login`
   */
  static async login(email: string, password: string): Promise<UserDto> {
    const response = await this.request<UserDto>(
      '/auth/login',
      'POST',
      {ContentType: 'application/json'},
      {data: {"email": email, "password": password}});

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Post) `/users`
   */
  static async signIn(datas: { user: User, pswd: string }) {
    const response = await this.request<UserDto>(
      '/users',
      'POST',
      {ContentType: 'application/json'},
      {
        data: {
          "lastName": datas.user.lastName,
          "firstName": datas.user.firstName,
          "userName": datas.user.userName,
          "email": datas.user.email,
          "password": datas.pswd,
          "birthdate": datas.user.birthdate,
          "address1": datas.user.address1,
          "address2": datas.user.address2,
          "city": datas.user.city,
          "countryId": datas.user.countryId,
          "postalCode": datas.user.postalCode,
          "role": "USER",
          "gems": 0,
          "uuid": await this.getUUID(datas.user.userName)
        }
      });

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (GET) `/country`
   */
  static async getCountries(): Promise<Country[]> {
    const response = await this.request<Country[]>(
      '/country',
      'GET',
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (GET) `/country/:countryId`
   */
  static async getCountry(countryId: number): Promise<Country> {
    const response = await this.request<Country>(
      `/country/${countryId}`,
      'GET',
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Get) `/news`
   */
  static async getNews(): Promise<News[]> {
    const response = await this.request<News[]>(
      '/news',
      'GET',
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Get) `/users/`
   */
  static async getUserByUuid(id: string): Promise<User> {
    const response = await this.request<User>(
      `/users/uuid/${id}`,
      'GET');

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (GET) `/products`
   */
  static async getProducts(): Promise<Product[]> {
    const response = await this.request<Product[]>(
      '/products',
      'GET',
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (GET) `/products/:id`
   */
  static async getProductById(productId: number): Promise<Product> {
    const response = await this.request<Product>(
      `/products/${productId}`,
      'GET',
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Get) `/cart/  `
   */
  static async getCartsFromUser(): Promise<FullCart> {
    const response = await this.request<FullCart>(
      `/cart`,
      'GET',
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Patch) `/cart/:cartId`
   */
  static async updateCartFromCartId(cartId: number, newQuantity: number): Promise<AxiosResponse> {
    const response = await this.request<CartItem[]>(
      `/cart/${cartId}`,
      'PATCH',
      {},
      {
        data: {
          "quantity": newQuantity
        }
      }
    );

    this.validateStatus(response);

    return response;
  }

  /**
   * @summary (Post) `/cart`
   */
  static async createNewCart(cartItem: CartDto): Promise<AxiosResponse> {
    const response = await this.request<any>(
      `/cart`,
      'POST',
      {ContentType: 'application/json'},
      {data: {"productId": cartItem.productId, "quantity": cartItem.quantity, "userId": cartItem.userId}}
    );

    this.validateStatus(response);

    return response;
  }

  /**
   * @summary (Delete) `/cart/:cartId`
   */
  static async deleteCartFromCartId(cartId: number): Promise<AxiosResponse> {
    const response = await this.request<CartItem[]>(
      `/cart/${cartId}`,
      'DELETE',
    );

    this.validateStatus(response);

    return response;
  }

  /**
   * @summary (Get) `/transactions/`
   */
  static async getTransactionsFromUserID(): Promise<Transaction[]> {
    const response = await this.request<Transaction[]>(
      `/transactions/user`,
      'GET',
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Get) `/invoiceProduct/:transactionId`
   */
  static async getAllInvoiceProductFromInvoiceId(invoiceId: number): Promise<InvoiceProduct[]> {
    const response = await this.request<InvoiceProduct[]>(
      `/invoiceProduct/${invoiceId}`,
      'GET',
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Path) `/users/`
   */
  static async updateUserProfile(newData: any): Promise<AxiosResponse> {
    const response = await this.request<AxiosResponse>(
      `/users`,
      'PATCH',
      {},
      {
        data: newData
      }
    );

    this.validateStatus(response);

    return response;
  }

    /**
   * @summary (Get) `/gems`
   */
  static async getGemsOffers(): Promise<Gems[]> {
    const response = await this.request<Gems[]>(
      `/gems`,
      'GET',
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Post) `/payments`
   */
  static async paidUserCart(): Promise<Transaction> {
    const response = await this.request<Transaction>(
      `/payments`,
      'POST'
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (POST) `/payments/paypal/`
   */
  static async paidGemsWithPaypal(offerObject: GemsDto) {
    const response = await this.request(
      '/payments/paypal',
      'POST',
      { ContentType: 'application/json' },
      {
        data: offerObject
      }
    )

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (POST) `/payments/paypal/`
   */
  static async paidGemsWithStripe(offerObject: GemsDto) {
    const response = await this.request(
      '/payments/stripe',
      'POST',
      { ContentType: 'application/json' },
      {
        data: {
          "offerId": offerObject.offerId
        }
      }
    )

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Post) `/users/archive`
   */
  static async archicheAccount() {
    const response = await this.request(
      `/users/archive`,
      'POST',
      {ContentType: 'application/json'},
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Post) `/auth/forgotPassword`
   */
  static async sendRecoveryMail(email: string) {
    const response = await this.request<RecoverPasswordDto>(
      `auth/forgotPassword`,
      'POST',
      {},
      {
        data: {
          email: email
        }
      }
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Post) `/auth/forgotPassword`
   */
  static async recoverPassword(token: string, password: string) {
    const response = await this.request(
      `/users`,
      'PATCH',
      {
        Authorization: `Bearer ${token}`
      },
      {
        data: {
          'password': password
        }
      }
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Post) `/users/datas`
   */
  static async getUserDatas() {
    const response = await this.request(
      `/users/datas`,
      'GET'
    );

    this.validateStatus(response);

    return response.data;
  }

  /**
   * @summary (Post) `/pdf/:transactionId`
   */
  static async getTransactionPdf(transactionId: number) {
    const response = await this.request(
      `/pdf/${transactionId}`,
      'GET',
      {},
      {
        responseType: 'arraybuffer'
      }
    );

    this.validateStatus(response);

    return response.data;
  }
}
