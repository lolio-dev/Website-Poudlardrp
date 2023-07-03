import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bearer_secret } from '../../config/constants';
import { JwtStrategy } from '../guards/jwt.strategy';
import { RolesGuard } from '../guards/roles.guard';
import { ProfileSchema } from '../resources/profile/entity/profile.schema';
import { ProfileModule } from '../resources/profile/profile.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileSchema]),
    ProfileModule,
    JwtModule.register({
      secret: bearer_secret(),
      signOptions: { expiresIn: '10s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
