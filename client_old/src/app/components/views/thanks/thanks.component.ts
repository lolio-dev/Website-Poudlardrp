import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonTypes } from '../../../enums/Button/ButtonTypes';
import { Colors } from '../../../enums/Colors';
import { Sizes } from '../../../enums/Sizes';
import { User } from '../../../types/User';
import { ToastService } from 'angular-toastify';
import { ApiService } from '../../../model/Api.service';
@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {
  public loaded: boolean = false;
  public user?: User;
  
  public label = 'NOT_FOUND.BACK';
  public type: ButtonTypes = ButtonTypes.outlined;
  public size: Sizes = Sizes.medium;
  public color: Colors = Colors.dark;

  interval: any = null;
  maxTimeCheck = 12;
  countCheck = 0;

  goBackBtnClass: string = 'btn btn--dark--outline btn--medium';

  constructor(private route: ActivatedRoute, private _toastService: ToastService,  public router: Router) { }

  ngOnInit(): void {
    Promise.all([this.loadUser()]).finally(() => {
      this.loaded = true;
      this._toastService.info('Commande en cours de traitement');
      this.interval = setInterval(this.checkPaiement.bind(this), 10000)
    })
  }

  async checkPaiement(): Promise<void> {
    const newGems = await (await ApiService.getUserByUuid(this.user?.uuid!)).gems;
    this.countCheck ++;
    if(newGems !== this.user?.gems) {
      clearInterval(this.interval);
      this._toastService.success('Votre commande a bien été validé');
      this.interval = null;
      await new Promise(res => setTimeout(res, 5000))
      window.location.href = '/';
    }
    else if(this.countCheck === this.maxTimeCheck){
      clearInterval(this.interval);
      this._toastService.error('Une erreur est survenue pendant votre commande');
      this.interval = null;
    }
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user;
      }
    );
  }
}
