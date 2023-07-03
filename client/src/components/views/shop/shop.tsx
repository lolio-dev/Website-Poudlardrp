import { uniq } from 'lodash';
import { FunctionComponent, useEffect, useState } from 'react';
import { t } from 'react-multi-lang';
import { useSearchParams } from 'react-router-dom';

import { ProductsService } from '../../../models/resources/products/products.service';
import { Product } from '../../../types/model/Product';
import { Profile } from '../../../types/model/Profile';
import { Filter } from '../../modules/filter/filter';
import { Loading } from '../../modules/loading/loading';
import ProductCard from '../../modules/product-card/product-card';

import styles from './shop.module.scss';
import {
  filterByProfile,
  filterByRarity,
  filterBySearch,
  filterByTags,
  sortByPrices,
} from './utils/filters';

type Props = {
  profile: Profile | undefined;
};

const rowsByGroups = 5;
const pageSize =
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const cardByRows = Math.floor((pageSize * (pageSize < 1240 ? 1 : 0.8)) / 300);

export const Shop: FunctionComponent<Props> = ({ profile }) => {
  const [searchParams] = useSearchParams();
  const [isLoaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([] as Product[]);
  const [groupsCount, setGroupsCount] = useState(1);
  const [filters, setFilters] = useState({
    rarities: [],
    tags: [],
    profile: [],
    price: '',
    search: '',
  } as any);

  useEffect(() => {
    if (!isLoaded) {
      setFilters({
        rarities: [],
        tags: [],
        profile: [],
        price: '',
        search: '',
      });
      getProducts();
    }
  }, [isLoaded, products]);

  const getProducts = async () => {
    setLoaded(true);
    setProducts(await ProductsService.getProducts());
  };

  const loadMore = () => {
    setGroupsCount(groupsCount + 1);
  };

  const getProductFiltered = () => {
    let filteredProducts = productsFilteredByCategory;

    if (filters.rarities.length > 0)
      filteredProducts = filterByRarity(filteredProducts, filters.rarities);
    if (filters.tags.length > 0) filteredProducts = filterByTags(filteredProducts, filters.tags);
    if (filters.profile.length > 0)
      filteredProducts = filterByProfile(filteredProducts, filters.profile, profile!.gems);
    if (filters.search) filteredProducts = filterBySearch(filteredProducts, filters.search);
    if (filters.price) filteredProducts = sortByPrices(filteredProducts, filters.price);

    return filteredProducts;
  };

  const handleSearch = (value: any) => {
    setFilters({
      ...filters,
      search: value,
    });
  };

  const handleCheck = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (key === 'rarities' || key === 'tags' || key === 'profile') {
      if (newFilters[key].includes(value)) {
        newFilters[key].splice(newFilters[key].indexOf(value), 1);
      } else {
        newFilters[key].push(value);
      }
    } else {
      newFilters[key] = newFilters[key] === value ? '' : value;
    }
    setFilters(newFilters);
  };

  if (!isLoaded) {
    return <Loading />;
  }

  //Apply filters
  const category = searchParams.get('category');
  const productsFilteredByCategory = category
    ? products.filter(p => p.category === category)
    : [...products];

  const productsFiltered = getProductFiltered();
  //Split in group of 20 products
  const groups = Array(groupsCount)
    .fill(0)
    .map((_, i) =>
      productsFiltered.slice(
        i * (cardByRows * rowsByGroups),
        i * (cardByRows * rowsByGroups) + cardByRows * rowsByGroups
      )
    );
  //Get tags from products
  const tags = uniq(productsFilteredByCategory.flatMap(p => (p.tags[0] ? p.tags : []))).sort(
    (a, b) => a.localeCompare(b)
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.filters}>
          <input
            className={styles.search}
            type="text"
            name="search"
            placeholder={t('shop.search')}
            onChange={event => {
              handleSearch(event.target.value);
            }}
          />
          <input
            className={styles.reset}
            type="reset"
            value={t('shop.reinitialize')}
            onClick={() => window.location.reload()}
          />
          <Filter
            filterGroup={{
              title: t('shop.filters.rarities.title'),
              filters: [
                {
                  label: t('shop.filters.rarities.common'),
                  name: 'common',
                  id: 'common',
                  onChange: () => {
                    handleCheck('rarities', 'common');
                  },
                },
                {
                  label: t('shop.filters.rarities.rare'),
                  name: 'rare',
                  id: 'rare',
                  onChange: () => {
                    handleCheck('rarities', 'rare');
                  },
                },
                {
                  label: t('shop.filters.rarities.legendary'),
                  name: 'legendary',
                  id: 'legendary',
                  onChange: () => {
                    handleCheck('rarities', 'legendary');
                  },
                },
              ],
              height: 81,
              type: 'checkbox',
            }}
          ></Filter>
          <Filter
            filterGroup={{
              title: t('shop.filters.tags.title'),
              filters: tags.map(t => ({
                label: t,
                name: t,
                id: t,
                onChange: () => {
                  handleCheck('tags', t);
                },
              })),
              height: 25 * tags.length,
              type: 'checkbox',
            }}
          ></Filter>
          <Filter
            filterGroup={{
              title: t('shop.filters.prices.title'),
              filters: [
                {
                  label: t('shop.filters.prices.asc'),
                  name: 'price',
                  id: 'asc',
                  onChange: () => {
                    handleCheck('price', 'asc');
                  },
                },
                {
                  label: t('shop.filters.prices.dsc'),
                  name: 'price',
                  id: 'dsc',
                  onChange: () => {
                    handleCheck('price', 'dsc');
                  },
                },
              ],
              height: 54,
              type: 'radio',
            }}
          ></Filter>
          {profile && (
            <Filter
              filterGroup={{
                title: t('shop.filters.profile.title'),
                filters: [
                  {
                    label: t('shop.filters.profile.canBy'),
                    name: 'canBy',
                    id: 'canBy',
                    onChange: () => {
                      handleCheck('profile', 'canBy');
                    },
                  },
                ],
                height: 27,
                type: 'checkbox',
              }}
            ></Filter>
          )}
        </div>
        <div className={styles.groups}>
          {groups.map((group, groupKey) => (
            <div className={styles.group} key={groupKey}>
              {group.map((product, productKey) => (
                <ProductCard product={product} key={productKey}></ProductCard>
              ))}
            </div>
          ))}
          {
            //S'il reste des produits à afficher
            groups.reverse()[0].length === cardByRows * rowsByGroups && (
              <button
                className={styles.loadMore}
                onClick={() => {
                  loadMore();
                }}
              >
                {t('shop.showMore')}
              </button>
            )
          }
        </div>
      </div>
    </main>
  );
};
