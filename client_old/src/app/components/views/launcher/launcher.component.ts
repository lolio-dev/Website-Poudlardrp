import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonTypes } from 'src/app/enums/Button/ButtonTypes';
import { Sizes } from 'src/app/enums/Sizes';
import { Button } from 'src/app/interfaces/button-interface';
import { Banner } from 'src/app/types/Banner';
import { User } from 'src/app/types/User';
import { Colors } from '../../../enums/Colors';

@Component({
  selector: 'app-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.scss'],
})
export class LauncherComponent implements OnInit {
  public loaded:boolean = false;
  public user?: User;

  public banner: Banner = {
    image: '../../../../assets/images/bannerLauncher.png',
    alt: 'Bannière représentant un match de quidditch',
  };

  public buttons: Button[] = [
    { type: ButtonTypes.default, size: Sizes.medium, label: 'Windows', color: Colors.primary, isRounded: true },
    { type: ButtonTypes.default, size: Sizes.medium, label: 'MacOS', color: Colors.primary, isRounded: true },
    { type: ButtonTypes.default, size: Sizes.medium, label: 'Linux', color: Colors.primary, isRounded: true },
  ];

  public buttonsClass: string = 'btn btn--medium btn--primary--default--rounded';

  colors = Colors;

  public opaque: string = 'opaque';

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    Promise.all([this.loadUser()]).finally(() => {this.loaded = true})
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user
      }
    );
  }

}
