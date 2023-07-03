import { Module } from '@nestjs/common';
import { GemsService } from './gems.service';
import { GemsController } from './gems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GemSchema } from './entity/gem.schema';

@Module({
  imports: [TypeOrmModule.forFeature([GemSchema])],
  controllers: [GemsController],
  providers: [GemsService],
  exports: [GemsService, TypeOrmModule],
})
export class GemsModule {}
