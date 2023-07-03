import { api_uri } from '../../../constants';

export class AuthService {
  static login(): void {
    window.open(`${api_uri}/auth`, '_self');
  }
}
