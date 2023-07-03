import { AxiosResponse } from 'axios';

import { Gem } from '../../../types/model/Gem';
import { ApiService } from '../../api.service';

export class GemsService {
  static async getGems(): Promise<Gem[]> {
    const response = await ApiService.request<Gem[]>('/gems', 'GET');

    ApiService.validateStatus(response);

    return response.data;
  }

  static async paidGemsWithStripe(offerId: string, partnerCode?: string): Promise<AxiosResponse> {
    const response = await ApiService.request<string>(
      '/payments/stripe',
      'POST',
      { ContentType: 'application/json' },
      {
        data: {
          offerId,
          partnerCode
        },
      }
    );

    ApiService.validateStatus(response);

    window.open(response.data, '_self');

    return response;
  }

  static async paidGemsWithPaypal(offerId: string, partnerCode?: string): Promise<AxiosResponse> {
    const response = await ApiService.request<string>(
      '/payments/paypal',
      'POST',
      { ContentType: 'application/json' },
      {
        data: {
          offerId,
          partnerCode
        },
      }
    );

    ApiService.validateStatus(response);

    window.open(response.data, '_self');

    return response;
  }
}
