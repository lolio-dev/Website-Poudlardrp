import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductIllustrationTypes } from '../../../types/enums/ProductIllustrationTypes';
import { Product } from '../../../types/model/Product';
import { truncateText } from '../../../utils/truncate';
import { Gem } from '../../elements/gem/gem';
import { ProductIllustration } from '../product-illustration/product-illustration';

import style from './product-card.module.scss';

type Props = {
  product: Product;
  className?: string;
};

const ProductCard: FunctionComponent<Props> = ({ product, className }) => {
  const navigate = useNavigate();

  const redirectToProduct = () => {
    navigate(`/products/${product.productId}`);
  };

  return (
    <article className={`${className} ${style.productCard}`} onClick={redirectToProduct}>
      <div className={`${style.content} ${product.rarity ? style[product.rarity] : style.default}`}>
        <h3 className={style.title}>{product.title}</h3>
        <div className={style.infos}>
          <p className={style.description}>{truncateText(product.description)}</p>
          <div className={style.price}>
            <p>{product.price}</p>
            <Gem />
          </div>
        </div>
      </div>
      <ProductIllustration
        type={ProductIllustrationTypes.IMAGE}
        productIllustrationConfig={{
          maximum: product.maximum,
          productsOwned: product.quantityOwned,
          totalProductsOwned: product.totalQuantityOwned,
          model: undefined,
          image: product.image,
          category: product.category,
          rarity: product.rarity,
        }}
        banner={true}
        className={style.image}
      />
    </article>
  );
};

export default ProductCard;
