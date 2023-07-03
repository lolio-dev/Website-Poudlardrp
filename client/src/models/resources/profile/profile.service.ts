import { Profile } from '../../../types/model/Profile';
import { ApiService } from '../../api.service';

export class ProfileService {
  static async getProfile(): Promise<Profile> {
    const response = await ApiService.request<Profile>(`/profile`, 'GET');

    ApiService.validateStatus(response);

    return response.data;
  }

  static async registerEmail(email: string): Promise<Profile> {
    const response = await ApiService.request<Profile>(
      `profile/register`,
      'POST',
      { 'Content-Type': 'application/json' },
      {
        data: {
          email,
        },
      }
    );

    ApiService.validateStatus(response);

    return response.data;
  }

  static async resendEmailValidation(): Promise<boolean> {
    const response = await ApiService.request<boolean>('profile/resend', 'POST');

    ApiService.validateStatus(response);

    return response.data;
  }

  static async exchangeToken(exchange: string): Promise<string> {
    const response = await ApiService.request<{ token: string }>(
      'token',
      'GET',
      {},
      {},
      `Bearer ${exchange}`
    );

    ApiService.validateStatus(response);

    return response.data.token;
  }
}
