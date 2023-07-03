import { TypeMapper } from 'ts-mapper';
import { GemSchema } from './entity/gem.schema';
import { GemFullDto } from './dto/gem-full.dto';

export class GemMapper extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<GemSchema, GemFullDto>()
      .map(
        s => s.gemOfferId,
        d => d.gemOfferId
      )
      .map(
        s => s.gems,
        d => d.gems
      )
      .map(
        s => s.bonus,
        d => d.bonus
      )
      .map(
        s => s.price,
        d => d.price
      )
      .map(
        s => s.stripeId,
        d => d.stripeId
      );

    this.createMap<GemFullDto, GemSchema>()
      .map(
        s => s.gemOfferId,
        d => d.gemOfferId
      )
      .map(
        s => s.gems,
        d => d.gems
      )
      .map(
        s => s.bonus,
        d => d.bonus
      )
      .map(
        s => s.price,
        d => d.price
      )
      .map(
        s => s.stripeId,
        d => d.stripeId
      );
  }
}
