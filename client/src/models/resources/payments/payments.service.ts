import { ApiService } from '../../api.service';

export class PaymentsService {
  static async paidUserCart() {
    const response = await ApiService.request('/payments', 'POST');

    ApiService.validateStatus(response);

    return response;
  }
}
