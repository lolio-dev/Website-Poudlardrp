import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ProfileService } from '../resources/profile/profile.service';
import { bearer_email_secret, bearer_secret } from '../../config/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private profileService: ProfileService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: bearer_secret(),
    });
  }

  async validate(payload: any) {
    const profile = await this.profileService.findOne(payload.uuid);
    return profile;
  }
}

@Injectable()
export class JwtEmailStrategy extends PassportStrategy(Strategy) {
  constructor(private profileService: ProfileService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: bearer_email_secret(),
    });
  }

  async validate(payload: any) {
    const profile = await this.profileService.findOneByEmail(payload.email);
    return profile;
  }
}
