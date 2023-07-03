import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  live,
  xbl,
  XBLExchangeRpsTicketResponse,
  XBLExchangeTokensResponse,
} from '@xboxreplay/xboxlive-auth';
import axios from 'axios';

import {
  azure_aad_client,
  azure_aad_redirect,
  azure_aad_scopes,
  azure_aad_secret,
  bearer_secret,
} from '../../config/constants';
import { UUID } from '../types/UUID';

@Injectable()
export class AuthService {
  constructor(public readonly jwtService: JwtService) {}

  public generateBearerToken(uuid: UUID) {
    return this.jwtService.sign({ uuid }, { secret: bearer_secret() });
  }

  public getRedirectUrl(): string {
    return live.getAuthorizeUrl(
      azure_aad_client(),
      azure_aad_scopes.join(' '),
      'code',
      azure_aad_redirect
    );
  }

  public async exchangeCodeToAuth(code): Promise<any> {
    try {
      const result = await live.exchangeCodeForAccessToken(
        code,
        azure_aad_client(),
        azure_aad_scopes.join(' '),
        azure_aad_redirect,
        azure_aad_secret()
      );

      return result;
    } catch (error) {
      throw new HttpException(
        'error_while_getting_microsoft_account',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async exchangeTokenToXBL(token: string): Promise<XBLExchangeRpsTicketResponse> {
    try {
      const result = await xbl.exchangeRpsTicketForUserToken(token, 'd');

      return result;
    } catch (error) {
      throw new HttpException('errors.error_while_getting_xbl', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async exchangeXBLToXSTS(xbl_token: string): Promise<XBLExchangeTokensResponse> {
    try {
      const result = await xbl.exchangeTokenForXSTSToken(xbl_token, {
        XSTSRelyingParty: 'rp://api.minecraftservices.com/',
        sandboxId: 'RETAIL',
      });

      return result;
    } catch (error) {
      throw new HttpException('errors.no_xbox_account', HttpStatus.UNAUTHORIZED);
    }
  }

  public async exchangeXSTSToMinecraft(xsts_token: string, userHash: string): Promise<any> {
    try {
      const result = await axios.post(
        'https://api.minecraftservices.com/authentication/login_with_xbox',
        {
          identityToken: `XBL3.0 x=${userHash};${xsts_token}`,
        }
      );

      return result;
    } catch (error) {
      throw new HttpException('errors.no_minecraft_account', HttpStatus.UNAUTHORIZED);
    }
  }

  public async exchangeMinecraftTokenToProfile(token: string): Promise<any> {
    return axios.get('https://api.minecraftservices.com/minecraft/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
