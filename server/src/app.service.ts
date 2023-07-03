import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { bearer_secret } from '../config/constants';
import { UUID } from './types/UUID';

@Injectable()
export class AppService {
  constructor(public readonly jwtService: JwtService) {}

  public sign(uuid: UUID) {
    return {
      token: this.jwtService.sign({ uuid }, { secret: bearer_secret() }),
    };
  }
}
