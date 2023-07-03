import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { useNavigate, useParams } from 'react-router-dom';

import { useToastify } from '../../../hooks/useToastify';
import { CartService } from '../../../models/resources/cart/cart.service';
import { ProductsService } from '../../../models/resources/products/products.service';
import { ButtonSizes } from '../../../types/enums/ButtonSizes';
import { ButtonTypes } from '../../../types/enums/ButtonTypes';
import { Colors } from '../../../types/enums/Colors';
import { Fonts } from '../../../types/enums/Fonts';
import { NumberInputSizes } from '../../../types/enums/NumberInputSizes';
import { ProductIllustrationTypes } from '../../../types/enums/ProductIllustrationTypes';
import { Success } from '../../../types/enums/Success';
import { Warnings } from '../../../types/enums/Warnings';
import { ProductIllustrationConfig } from '../../../types/logic/ProductIllustrationConfig';
import { Product as ProductType } from '../../../types/model/Product';
import { Profile } from '../../../types/model/Profile';
import Button from '../../elements/button/button';
import { Gem } from '../../elements/gem/gem';
import { NumberInput } from '../../elements/number-input/number-input';
import Separator from '../../elements/separator/separator';
import { Loading } from '../../modules/loading/loading';
import { ProductBadges } from '../../modules/product-badges/product-badges';
import ProductCard from '../../modules/product-card/product-card';
import { ProductIllustration } from '../../modules/product-illustration/product-illustration';

import style from './product.module.scss';

type Props = {
  profile: Profile | undefined;
  updateTotalCartsQuantity: () => void;
};

const Product: FunctionComponent<Props> = ({ profile, updateTotalCartsQuantity }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = useTranslation();
  const { toastSuccess, toastWarning, toastError } = useToastify();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>();
  const [similarProducts, setSimilarProducts] = useState<ProductType[]>();
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>();
  const [productIllustrationConfig, setProductIllustrationConfig] = useState<ProductIllustrationConfig>();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const product: ProductType = await ProductsService.getProductById(id!);
        const similarProducts: ProductType[] = await ProductsService.getSimilarProducts(id!);
        setPrice(product.price);
        setProduct(product);
        setSimilarProducts(similarProducts);
        setIsAvailable(product.isAvailable);
        setProductIllustrationConfig({
          category: product.category,
          image: product.image,
          maximum: product.maximum,
          model: product.model,
          productsOwned: product.quantityOwned,
          totalProductsOwned: product.totalQuantityOwned,
          rarity: product.rarity,
        });
      } catch (e) {
        navigate('/not-found');
      }
    };

    if (id) {
      setLoaded(false);
      Promise.all([getProducts()]).finally(() => {
        setLoaded(true);
      });
    }
  }, [id, navigate]);

  const addToCart = async () => {
    if (profile) {
      if (product) {
        try {
          const res = await CartService.createNewCart({
            productId: product.productId,
            quantity: quantity,
          });
          await updateTotalCartsQuantity();
          toastSuccess(Success.ADDED_TO_CART, {
            onClick: () => {
              navigate('/cart');
            },
          });
          setIsAvailable(res.isAvailable);
          if (!isAvailable) {
            setQuantity(1);
          }
        } catch (e: any) {
          toastError(e);
        }
      }
    } else {
      toastWarning(Warnings.NEED_TO_LOGIN);
    }
  };

  const alreadyQuantityMaximumOwnedWarning = () => {
    if (product) {
      toastWarning(Warnings.ALREADY_MAX_QUANTITY_OWNED, {
        messageOptions: {
          totalQuantityOwned: product.totalQuantityOwned,
          productTitle: product.title,
          productMaximum: product.maximum,
        },
      });
    }
  };

  if (!loaded) {
    return <Loading/>;
  }

  return (
    <>
      <main className={style.main}>
        {product && (
          <section className={style.product}>
            <div className={style.illustration}>
              {productIllustrationConfig && (
                <ProductIllustration
                  type={ProductIllustrationTypes.MIXED}
                  banner={!!profile}
                  className={style.illustration}
                  productIllustrationConfig={productIllustrationConfig}
                />
              )}
            </div>

            <div className={style.sidebar}>
              <div className={style.info}>
                <h1 data-cy="title" className={style.title}>
                  {product.title}
                </h1>
                <Separator
                  width={'250px'}
                  height={3}
                  color={Colors.secondary}
                  className={style.separator}
                />
                <ProductBadges rarity={product.rarity} tags={product.tags} className={style.tags}/>
                <p data-cy="description" className={style.description}>
                  {product?.description}
                </p>
              </div>
              <div className={style.actions}>
                {product.maximum !== 1 && product.maximum !== 0 ? (
                  <NumberInput
                    onChange={value => {
                      setQuantity(value);
                      setPrice(value * product.price);
                    }}
                    defaultValue={quantity}
                    onMaxReached={
                      isAvailable
                        ? product.totalQuantityOwned
                          ? () =>
                            toastWarning(Warnings.CANNOT_OWN_MORE, {
                              messageOptions: {
                                productMaximum: product.maximum,
                                quantityBought: product.quantityOwned,
                              },
                            })
                          : () =>
                            toastWarning(Warnings.CANNOT_OWN_MORE_WHEN_NOT_QUANTITY_BOUGHT, {
                              messageOptions: {
                                productMaximum: product.maximum,
                              },
                            })
                        : () => {
                          return;
                        }
                    }
                    onClickWhenDisabled={alreadyQuantityMaximumOwnedWarning}
                    className={style.counter}
                    size={NumberInputSizes.mix}
                    min={1}
                    max={product.quantityAvailable ? product.quantityAvailable : product.quantityAvailable === 0 ? 1 : undefined}
                    disabled={!isAvailable}
                  />
                ) : null}
                <Button
                  type={ButtonTypes.outlined}
                  label={t('product.add_to_cart')}
                  color={Colors.secondary}
                  background={Colors.transparent}
                  borderRadius={15}
                  borderColor={Colors.secondary}
                  borderSize={2}
                  font={Fonts.montserrat}
                  size={ButtonSizes.medium}
                  onClick={addToCart}
                  onClickWhenDisabled={alreadyQuantityMaximumOwnedWarning}
                  className={style.basketbtn}
                  disabled={!isAvailable}
                />
                <span data-cy="price" className={style.price}>
                  {price}
                  <Gem color={Colors.black} height={24} width={24}/>
                </span>
              </div>
            </div>
          </section>
        )}
        {similarProducts?.length !== 0 && (
          <section className={style.similarProducts}>
            <h1 className={style.similarProductsTitle}>{t('similar_products.title')}</h1>
            <div className={style.similarProductsProducts} data-cy="similar-products">
              {similarProducts &&
                similarProducts.map(product => (
                  <ProductCard
                    data-cy="similar-product"
                    key={product.productId}
                    product={product}
                    className={style.similarProductsProduct}
                  />
                ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Product;
