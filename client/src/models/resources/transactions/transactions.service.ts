import { Transaction } from '../../../types/model/Transaction';
import { ApiService } from '../../api.service';

export class TransactionsService {
  /**
   * @summary (Get) `/transactions/:userId`
   */
  static async getAllTransactionsFromUser(): Promise<Transaction[]> {
    const response = await ApiService.request<Transaction[]>(`/transactions/profile`, 'GET');

    ApiService.validateStatus(response);

    return response.data;
  }

  static async getTransactionPdf(transactionId: string) {
    const response = await ApiService.request(
      `/pdf/${transactionId}`,
      'GET',
      {},
      {
        responseType: 'arraybuffer',
      }
    );

    ApiService.validateStatus(response);

    return response.data;
  }
}
