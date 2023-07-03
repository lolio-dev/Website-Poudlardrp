import { FunctionComponent, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { useToastify } from '../../../hooks/useToastify';
import { CartService } from '../../../models/resources/cart/cart.service';
import { Colors } from '../../../types/enums/Colors';
import { Errors } from '../../../types/enums/Errors';
import { NumberInputSizes } from '../../../types/enums/NumberInputSizes';
import { Warnings } from '../../../types/enums/Warnings';
import { CartItem } from '../../../types/model/CartItem';
import { Gem } from '../../elements/gem/gem';
import { NumberInput } from '../../elements/number-input/number-input';
import Separator from '../../elements/separator/separator';

import style from './cart-product.module.scss';

interface Props {
  cart: CartItem;
  updateCarts: (cartId: string) => void;
  updateTotalPrice: (newTotalPrice: number) => void;
  updateTotalCartsQuantity: () => void;
}

const CartProduct: FunctionComponent<Props> = ({
  cart,
  updateCarts,
  updateTotalPrice,
  updateTotalCartsQuantity,
}) => {
  const [totalCartPrice, setTotalCartPrice] = useState<number>(cart.quantity * cart.product.price);
  const { toastError, toastSuccess, toastWarning } = useToastify();
  const navigate = useNavigate();

  const updateCart = async (newQuantity: number) => {
    try {
      const res = await CartService.updateCart(cart.cartId, newQuantity);
      await updateTotalCartsQuantity();
      setTotalCartPrice(res.totalCartPrice);
      updateTotalPrice(res.totalPrice);
      toastSuccess('Quantité mise à jour');
    } catch (e) {
      toastError(Errors.DEFAULT);
    }
  };

  const deleteCart = async () => {
    try {
      await CartService.deleteCart(cart.cartId);
      updateCarts(cart.cartId);
      await updateTotalCartsQuantity();
      toastSuccess('Element supprimé');
    } catch (e) {
      toastError(Errors.DEFAULT);
    }
  };

  const navigateToProductPage = () => {
    navigate(`/products/${cart.product.productId}`);
  };

  return (
    <>
      <div className={style.cart}>
        <img
          className={style.image}
          src={cart.product.image}
          alt=""
          onClick={navigateToProductPage}
        />
        <div className={style.infos}>
          <div className={style.top}>
            <div className={style.header}>
              <h2 className={style.title} onClick={navigateToProductPage}>
                {cart.product.title}
              </h2>
              <div className={style.price}>
                <p>{cart.product.price}</p>
                <Gem color={Colors.black} width={26} height={26} />
              </div>
            </div>
            <Separator width={200} height={2} color={Colors.black} />
            <p className={style.description}>{cart.product.description}</p>
          </div>
          <div className={style.action}>
            {cart.product.maximum !== 1 && cart.product.maximum !== 0 ? (
              <div className={style.quantity} data-testid="number-input">
                <NumberInput
                  defaultValue={cart.quantity}
                  onChange={updateCart}
                  min={1}
                  max={
                    cart.product.maximum === -1 ? undefined : cart.product.totalQuantityAvailable
                  }
                  onMaxReached={() =>
                    toastWarning(Warnings.CANNOT_OWN_MORE, {
                      messageOptions: {
                        productMaximum: cart.product.maximum,
                        quantityBought: cart.product.quantityOwned,
                      },
                    })
                  }
                  size={NumberInputSizes.small}
                />

                <div className={style.price} data-testid="total-price">
                  <p>{totalCartPrice}</p>
                  <Gem color={Colors.black} width={26} height={26} />
                </div>
              </div>
            ) : (
              <div />
            )}
            <div className={style.delete} data-testid="delete">
              <BsFillTrashFill className={style.icon} onClick={deleteCart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CartProduct };
