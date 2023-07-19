import { Component, OnInit } from '@angular/core';
import {Sizes} from "../../../enums/Sizes";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../model/Api.service";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  public Sizes = Sizes
  public token?: string

  constructor(private route: ActivatedRoute, private router: Router, private _toastService: ToastService) {
    this.route.queryParams
      .subscribe(params => {
          this.token = params.token;
        });

    if (!this.token) {
      this.router.navigate(['/']).then();
    }
  }

  ngOnInit(): void {}

  updatePassword(e: Event) {
    e.preventDefault()

    const password = (<HTMLInputElement>document.getElementById('password')?.childNodes[0]).value;
    const passwordConfirmation = (<HTMLInputElement>document.getElementById('passwordConfirmation')?.childNodes[0]).value;

    if(password == passwordConfirmation) {
     ApiService.recoverPassword(this.token!, password)
       .then(() => this.router.navigate(['/']).then())
       .catch(() => this._toastService.error('Oups ! Il y a une erreur'))
    } else {
      this._toastService.error('Les mots de passe ne corespondent pas')
    }
  }
}
