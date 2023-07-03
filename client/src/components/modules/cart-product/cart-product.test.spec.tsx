import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { cartItemCommonMax1, cartItemCommonMax2 } from '../../../tests/fixtures/cart.fixtures';

import { CartProduct } from './cart-product';

describe('Cart product element', () => {
  describe('rendering cart product', () => {
    it('should render cart-product with good informations', () => {
      const updateCarts = () => {};
      const updateTotalPrice = () => {};
      const updateTotalCartsQuantity = () => {};

      const result = render(
        <BrowserRouter>
          <CartProduct
            cart={cartItemCommonMax1}
            updateCarts={updateCarts}
            updateTotalPrice={updateTotalPrice}
            updateTotalCartsQuantity={updateTotalCartsQuantity}
          />
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.queryAllByRole('img')).not.toBeNull();
      expect(result.queryByText(cartItemCommonMax1.product.title)).not.toBeNull();
      expect(result.queryByText(cartItemCommonMax1.product.description)).not.toBeNull();
      expect(result.queryByText(cartItemCommonMax1.product.price)).not.toBeNull();
      expect(result.queryByTestId('delete')).not.toBeNull();
    });

    it('should render cart-product without number input', () => {
      const updateCarts = () => {};
      const updateTotalPrice = () => {};
      const updateTotalCartsQuantity = () => {};

      const result = render(
        <BrowserRouter>
          <CartProduct
            cart={cartItemCommonMax1}
            updateCarts={updateCarts}
            updateTotalPrice={updateTotalPrice}
            updateTotalCartsQuantity={updateTotalCartsQuantity}
          />
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.queryByTestId('number-input')).toBeNull();
      expect(result.queryByTestId('total-price')).toBeNull();
    });

    it('should render cart-product with number input', () => {
      const updateCarts = () => {};
      const updateTotalPrice = () => {};
      const updateTotalCartsQuantity = () => {};

      const result = render(
        <BrowserRouter>
          <CartProduct
            cart={cartItemCommonMax2}
            updateCarts={updateCarts}
            updateTotalPrice={updateTotalPrice}
            updateTotalCartsQuantity={updateTotalCartsQuantity}
          />
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.queryByTestId('number-input')).not.toBeNull();
      expect(result.queryByTestId('total-price')).not.toBeNull();
    });
  });
});
