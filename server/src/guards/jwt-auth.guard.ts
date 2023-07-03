import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, profile, info) {
    return profile;
  }
}
