import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { website_url } from '../../config/constants';
import { ProfileService } from '../resources/profile/profile.service';
import { uuidToDashedUUID } from '../utils/minecraft/uuidUtils';
import { AuthService } from './auth.service';
import jwt_decode from "jwt-decode";

type OpenIdToken = {
  email: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService
  ) {}

  @Get()
  redirect(@Res() res: Response) {
    res.redirect(this.authService.getRedirectUrl());
  }

  @Get('/callback')
  async callback(@Res() res: Response, @Query('code') code: string) {
    //#region micromerde
    if (code) {
      try {
        //microsoft
        const auth = await this.authService.exchangeCodeToAuth(code);

        const email = jwt_decode<OpenIdToken>(auth.id_token).email;
        const savedProfile = await this.profileService.findOneByEmail(email); 

        if (savedProfile) {
          res.redirect(
            `${website_url}?access_token=${this.authService.generateBearerToken(savedProfile.uuid)}`
          );
        } else {
        //xbox
          const xbl = await this.authService.exchangeTokenToXBL(auth.access_token);
          const xsts = await this.authService.exchangeXBLToXSTS(xbl.Token);

          //minecraft
          const minecraft = await this.authService.exchangeXSTSToMinecraft(
            xsts.Token,
            xsts.DisplayClaims.xui[0].uhs
          );
          const player = await this.authService.exchangeMinecraftTokenToProfile(
            minecraft.data.access_token
          );

          //Login OR Signup
          const profile = await this.profileService.create({
            uuid: uuidToDashedUUID(player.data.id),
            email,
          });

          res.redirect(
            `${website_url}?access_token=${this.authService.generateBearerToken(profile.uuid)}`
          );
        }
      } catch (error) {
        res.redirect(`${website_url}?error=${error.response}`);
      }
    }
    //#endregion
  }
}
