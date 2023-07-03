import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { ProfileModule } from '../profile/profile.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartSchema } from './entity/cart.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartSchema]),
    ProfileModule,
    forwardRef(() => ProductsModule),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
