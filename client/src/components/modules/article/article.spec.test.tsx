import { render } from '@testing-library/react';
import { EnabledArticle } from '../../../tests/fixtures/articles.fixtures';
import { expect } from "vitest";

import { Article } from './article';

describe('Article element', () => {
  describe('rendering article', () => {
    it('should render article with good informations', () => {
      const result = render(<Article article={EnabledArticle} />);

      const title = result.getByText(EnabledArticle.title);
      const image = result.getByRole('img');

      expect(result).toBeDefined();
      expect(image).toHaveProperty('src', EnabledArticle.image);
      expect(title).toBeDefined();
    });
  });
});
