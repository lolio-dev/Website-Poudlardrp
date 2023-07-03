import { ProductSchema } from './entity/product.schema';
import { ProductDto } from './dto/product.dto';
import { PATH_METADATA } from '@nestjs/common/constants';
import { FilesController } from '../files/files.controller';
import { ProductStatus } from '../../types/enums/productStatus.enum';
import { api_url } from '../../../config/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { v4 as uuidv4 } from 'uuid';

export function productToFullDto(
  product: ProductSchema,
  quantityOwned,
  inCartQuantity,
  isModelExisting
): ProductDto {
  // quantityOwned only includes buyed products while totalQuantityOwned also includes in carts products
  // quantityAvailable only includes buyed products while totalQuantityAvailable also includes in carts products
  const filesUrl = Reflect.getMetadata(PATH_METADATA, FilesController);
  const totalQuantityOwned = quantityOwned + inCartQuantity;
  const quantityAvailable =
    product.maximum === -1
      ? null
      : totalQuantityOwned < product.maximum
        ? product.maximum - totalQuantityOwned
        : null;
  const totalQuantityAvailable = product.maximum === -1 ? null : product.maximum - quantityOwned;

  return {
    ...product,
    tags: product.tags.split(';'),
    model: isModelExisting ? `${api_url}/${filesUrl}/models/${product.model}` : null,
    image: product.image ? product.image : null,
    isAvailable: quantityAvailable > 0 || product.maximum === -1,
    quantityAvailable,
    totalQuantityAvailable,
    quantityOwned,
    totalQuantityOwned,
  };
}

export function fullDtoToProduct(product: ProductDto): ProductSchema {
  return { ...product, tags: product.tags.join(';') };
}

export function createProductDtoToProduct(product: CreateProductDto): ProductSchema {
  return {
    ...product,
    tags: product.tags.join(';'),
    productId: uuidv4(),
    status: ProductStatus.ENABLE,
  };
}
