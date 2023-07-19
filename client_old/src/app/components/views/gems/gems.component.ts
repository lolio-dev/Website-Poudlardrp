import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DEFAULT_TVA} from '../../../constants';
import {ApiService} from '../../../model/Api.service';
import {loadFromSessionStorage} from '../../../store';
import {Gems} from '../../../types/Gems';
import {User} from '../../../types/User';
import {translate} from "../../../../utils/errors";
import {ToastService} from "angular-toastify";
@Component({
  selector: 'app-gems',
  templateUrl: './gems.component.html',
  styleUrls: ['./gems.component.scss']
})
export class GemsComponent implements OnInit {
  public loaded: boolean = false;
  public user?: User;

  public tva: number = DEFAULT_TVA;

  public gemsOffers: Gems[] = [];
  public offerSelected : Gems = {
    gemOfferId: -1,
    gems : 0,
    bonus: 0,
    price: 0,
    stripId: ""
  };

  public gemImage = '../../../../assets/images/gemImage.png';
  public primaryButtonClass: string = 'btn btn--large btn--validation--default--rounded';

  constructor(private route: ActivatedRoute, public router: Router, private _toastService: ToastService) { }

  ngOnInit(): void {
    if (!loadFromSessionStorage()?.acessToken) {
      this.router.navigate(['/']).then();
    }

    Promise.all([this.loadUser(), this.loadGemOffers()]).finally(() => this.loaded = true)
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user;
        this.tva = (await ApiService.getCountry(this.user!.countryId)).tva;
      }
    );
  }

  async loadGemOffers() {
    this.gemsOffers = await ApiService.getGemsOffers();
  }

  setOfferSelected(offer: Gems){
    this.offerSelected = offer;
  }

  async paidWithPaypal() {
    try {
      await ApiService.paidGemsWithPaypal({
        "offerId": this.offerSelected.gemOfferId,
        }
      )
        .then((data: any) => {
          const links: Record<string, string>[] = data['links'];
          const link: Record<string, string> | undefined = links.find(link => link['rel'] === 'approve');
          location.href = link!['href'];
        })
    } catch (error: any) {
      this._toastService.error(translate(error.error))
    }
  }

  async paidWithStripe() {
    try {
      await ApiService.paidGemsWithStripe(
        {
          "offerId": this.offerSelected.gemOfferId,
        }
      ).then((data: any) => {
          location.href = data;
        })
    } catch (error: any) {
      this._toastService.error(translate(error.error))
    }
  }
}
