import { Article } from '../../../types/model/Article';
import { ApiService } from '../../api.service';

export class ArticlesService {
  /**
   * @summary (Get) `/article`
   */
  static async getArticles(): Promise<Article[]> {
    const response = await ApiService.request<Article[]>('/news', 'GET');

    ApiService.validateStatus(response);

    return response.data;
  }
}
