import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { expect, vi } from "vitest";

import { ArticlesService } from '../../../models/resources/articles/articles.service';
import { articles } from '../../../tests/fixtures/articles.fixtures';

import { Quibbler } from './quibbler';

describe('Quibbler view', () => {
  describe('rendering quibbler', () => {
    let mockGetArticles: any;
    let container: any = null;

    beforeEach(() => {
      container = document.createElement('div');
      mockGetArticles = vi.spyOn(ArticlesService, 'getArticles').mockResolvedValue(articles);
    });

    it('should render articles', async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Quibbler />
          </BrowserRouter>,
          container
        );
      });

      const articles = container.getElementsByTagName('article');

      expect(mockGetArticles).toHaveBeenCalled();
      expect(container).toBeDefined();
      expect(articles.length).toEqual(articles.length);
    });
  });
});
