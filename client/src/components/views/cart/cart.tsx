import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-multi-lang';

import { useRedirect } from '../../../hooks/useRedirect';
import { useToastify } from '../../../hooks/useToastify';
import { CartService } from '../../../models/resources/cart/cart.service';
import { PaymentsService } from '../../../models/resources/payments/payments.service';
import { ButtonSizes } from '../../../types/enums/ButtonSizes';
import { ButtonTypes } from '../../../types/enums/ButtonTypes';
import { Colors } from '../../../types/enums/Colors';
import { Warnings } from '../../../types/enums/Warnings';
import { CartItem } from '../../../types/model/CartItem';
import { Carts } from '../../../types/model/Carts';
import { Profile } from '../../../types/model/Profile';
import Button from '../../elements/button/button';
import { Gem } from '../../elements/gem/gem';
import { Modal } from '../../elements/modal/modal';
import { Redirect } from '../../elements/redirect/redirect';
import Separator from '../../elements/separator/separator';
import { CartProduct } from '../../modules/cart-product/cart-product';
import { Loading } from '../../modules/loading/loading';

import style from './cart.module.scss';

interface Props {
  profile: Profile | undefined;
  updateTotalCartsQuantity: () => void;
}

const Cart: FunctionComponent<Props> = ({ profile, updateTotalCartsQuantity }) => {
  const { toastError, toastWarning } = useToastify();
  const { warningRedirect } = useRedirect();
  const t = useTranslation();

  const [carts, setCarts] = useState<CartItem[]>();
  const [loaded, setLoaded] = useState<boolean>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getCarts = async () => {
      if (profile) {
        try {
          const carts: Carts = await CartService.getCartsFromUser();

          setCarts(carts.carts);
          setTotalPrice(carts.totalPrice);
        } catch (e) {
          toastError();
        }
      }
    };

    if (!profile) {
      warningRedirect('/', Warnings.NEED_TO_LOGIN);
    }

    Promise.all([getCarts()]).finally(() => {
      setLoaded(true);
    });
  }, [loaded]);

  const updateTotalPrice = (newTotalPrice: number) => {
    setTotalPrice(newTotalPrice);
  };

  const updateCarts = (cartId: string) => {
    setCarts(prevState => prevState?.filter((cart: CartItem) => cart.cartId !== cartId));
  };

  const confirmCart = async () => {
    try {
      await PaymentsService.paidUserCart();
      window.location.href = '/?success=success.CART_VALIDATED';
    } catch (e) {
      toastError();
    }
  };

  if (!loaded) {
    return <Loading />;
  }

  return (
    <>
      {carts && (
        <main>
          {carts.length ? (
            <div className={style.content}>
              <h1 className={style.title}>Votre panier</h1>
              <div className={style.container}>
                <div className={style.carts}>
                  {carts.map(cart => (
                    <CartProduct
                      key={cart.cartId}
                      cart={cart}
                      updateCarts={updateCarts}
                      updateTotalPrice={updateTotalPrice}
                      updateTotalCartsQuantity={updateTotalCartsQuantity}
                    />
                  ))}
                </div>
                <div className={style.payment}>
                  <div className={style.price}>
                    <p className={style.label}>{t('cart.payment.total_label')}: </p>
                    <p className={style.value}>
                      {totalPrice} <Gem color={Colors.black} />
                    </p>
                  </div>
                  <div>
                    <Button
                      type={ButtonTypes.full}
                      onClick={() => setIsConfirmModalOpen(true)}
                      label={t('cart.payment.confirm_button_label')}
                      background={Colors.validation}
                      color={Colors.white}
                      size={ButtonSizes.mini}
                      borderRadius={7}
                      width="100%"
                      disabled={!carts.length || !profile || (profile && profile.gems < totalPrice)}
                      onClickWhenDisabled={
                        !carts.length
                          ? () => toastWarning('Votre panier est vide')
                          : () => toastWarning("Vous n'avez pas assez de gemmes")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={style.emptyCart}>
              <p className={style.emptyCart__label}>{t('cart.empty_cart.title')}</p>
              <Redirect
                className={style.emptyCart__cta}
                to="/shop"
                label={t('cart.empty_cart.cta_label')}
              />
            </div>
          )}

          <Modal
            width={350}
            className={style.confirmModal}
            open={isConfirmModalOpen}
            setOpen={setIsConfirmModalOpen}
          >
            <div className={style.modalContent}>
              <div className={style.products}>
                <h2 className={style.title}>{t('cart.confirm_cart.title')}</h2>

                <div className={style.carts}>
                  {carts &&
                    carts.map(cart => (
                      <div className={style.cart} key={cart.cartId}>
                        <p className={style.cart__title}>
                          <span>{cart.quantity} </span>
                          {cart.product.title}
                        </p>
                        {cart.product.price !== 0 ? (
                          <p className={style.cart__price}>
                            {cart.product.price * cart.quantity} <Gem color={Colors.black} />
                          </p>
                        ) : (
                          <p className={style.cart__price}>
                            <p className={style.free}>{t('cart.confirm_cart.free_label')}</p>
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div className={style.confirmation}>
                <Separator width={'100%'} />

                <div className={style.totalPrice}>
                  <p className={style.totalPrice__label}>{t('cart.confirm_cart.total')}</p>
                  <p className={style.totalPrice__value}>
                    {totalPrice} <Gem color={Colors.black} />
                  </p>
                </div>

                <div className={style.actions}>
                  <Button
                    onClick={() => setIsConfirmModalOpen(false)}
                    label={t('cart.confirm_cart.cancel_button_label')}
                    borderColor={Colors.danger}
                    type={ButtonTypes.full}
                    size={ButtonSizes.mini}
                    borderRadius={7}
                    color={Colors.danger}
                    borderSize={1}
                  />
                  <Button
                    onClick={confirmCart}
                    label={t('cart.confirm_cart.validate_button_label')}
                    borderColor={Colors.validation}
                    type={ButtonTypes.full}
                    size={ButtonSizes.mini}
                    borderRadius={7}
                    color={Colors.validation}
                    borderSize={1}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </main>
      )}
    </>
  );
};

export { Cart };
