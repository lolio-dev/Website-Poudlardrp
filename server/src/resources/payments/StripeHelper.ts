import Stripe from 'stripe';
import { GemSchema } from '../gems/entity/gem.schema';
import { UpdateGemDto } from '../gems/dto/update-gem.dto';

class StripeHelper {
  private readonly stripe = new Stripe(process.env.SHOP_STRIPE_SECRET, {
    apiVersion: '2020-08-27',
    typescript: true,
  });

  public async createProduct(gems: number, bonus: number, price: number): Promise<string> {
    const stripeProduct: Stripe.Product = await this.stripe.products.create({
      name: `${gems + bonus} gemmes (${gems} + ${bonus} bonus)`,
    });

    const stripePrice: Stripe.Price = await this.stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: price * 100,
      currency: 'eur',
    });

    return stripePrice.id;
  }

  public async createCoupon(percentage: number, codeName: string) {
    const stripeCoupon: Stripe.Coupon = await this.stripe.coupons.create({
      name: `${codeName} (${percentage}%)`,
      percent_off: percentage,
    });

    return stripeCoupon.id;
  }

  public async editProduct(dto: UpdateGemDto, offer: GemSchema): Promise<string> {
    const stripePrice: Stripe.Price = await this.stripe.prices.retrieve(dto.stripeId);
    if (!stripePrice) return this.createProduct(dto.gems, dto.bonus, dto.price);

    const stripeProduct: Stripe.Product = await this.stripe.products.retrieve(
      typeof stripePrice.product === 'string' ? stripePrice.product : stripePrice.product.id
    );

    const newProduct = await this.stripe.products.update(stripeProduct.id, {
      name: `${dto.gems ? dto.gems : offer.gems + dto.bonus ? dto.bonus : offer.bonus} gemmes (${
        dto.gems ? dto.gems : offer.gems
      } + ${dto.bonus ? dto.bonus : offer.bonus} bonus)`,
    });
    const newPrice = await this.stripe.prices.create({
      product: newProduct.id,
      unit_amount: dto.price ? dto.price * 100 : offer.price * 100,
      currency: 'eur',
    });

    return newPrice.id;
  }

  public async deleteProduct(stripeId: string): Promise<void> {
    const stripePrice: Stripe.Price = await this.stripe.prices.retrieve(stripeId);
    if (!stripePrice) return;

    const stripeProduct: Stripe.Product = await this.stripe.products.retrieve(
      typeof stripePrice.product === 'string' ? stripePrice.product : stripePrice.product.id
    );
    await this.stripe.products.del(stripeProduct.id);
  }
}

export default StripeHelper;
