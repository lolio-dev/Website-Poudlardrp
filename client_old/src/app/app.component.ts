import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'angular-toastify';
import { translate } from 'src/utils/errors';
import { getUserUuid } from 'src/utils/user';
import { ApiService } from './model/Api.service';
import { ModalService } from './services/modal.service';
import { loadFromSessionStorage, updateSessionStorage } from './store';
import { Country } from './types/Country';
import { User } from './types/User';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loaded:boolean = false;
  public error:boolean = false;

  public user ?: User;

  public primaryButtonClass: string = 'btn btn--large btn--validation--default--rounded';
  public secondaryButtonClass: string = 'btn btn--large btn--primary--default--rounded';
  public countries:Country[] = [];

  constructor(private translate: TranslateService, private modalService: ModalService, private _toastService: ToastService, public router: Router) {
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
    Promise.all([this.loadCountry(), this.loadUser()]).finally(() => {this.loaded = true});
  }

  async loadUser(){
    const token = loadFromSessionStorage()?.acessToken;
    if(token){
      const userId = getUserUuid(token)
      this.user = await ApiService.getUserByUuid(userId);
    }
  }

  async loadCountry(){
    this.countries = await ApiService.getCountries();
  }


  connect(event: any): void {
    event.preventDefault();
    const mail = event.srcElement[0].value;
    const pass = event.srcElement[1].value;
    this.login(mail, pass);
  }

  async login(mail: string, pass: string) {
    try {
      updateSessionStorage({acessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMThmOWM3OTgtMTZmZi00OWJhLTg4YmEtYjI0MTdmMzRiZjgxIiwiaWF0IjoxNjU2ODQ5MDcxLCJleHAiOjE2NTY5MzU0NzF9.Ws37JvZ7ptkMfMR23lIsv0sLT-ATBw4V_88FqVMAXqE', refreshToken: ''});
      this.closeModal('login-modal');
      location.reload();
    } catch(error: any)  {
      this._toastService.error(translate(error.message || error.error))
    }
  }

  async signin(event: any): Promise<void> {
    event.preventDefault();
    try {
      await ApiService.signIn({
        user: {
          firstName: event.srcElement[0].value,
          lastName: event.srcElement[1].value,
          userName: event.srcElement[2].value,
          email: event.srcElement[3].value,
          birthdate: event.srcElement[5].value,
          address1: event.srcElement[6].value,
          address2: event.srcElement[7].value,
          city: event.srcElement[8].value,
          countryId: 1,
          postalCode: event.srcElement[10].value,
          uuid: "",
          gems: 0
        },
        pswd: event.srcElement[4].value
      });
      this.login(event.srcElement[3].value, event.srcElement[4].value);
      this.closeModal('signin-modal');
    } catch(error:any)  {
      this._toastService.error(translate(error.error || error.message || error.toString()))
    }
  }

  sendRecovery(event: any): void {
    event.preventDefault();

    const email = (<HTMLInputElement>document.getElementById('email')?.childNodes[0]).value;

    ApiService.sendRecoveryMail(email).then()

    this.closeModal('recovery-modal');
  }

  openSigninModal(): void {
    this.closeModal('login-modal');
    this.modalService.open('signin-modal');
  };

  openRecoveryModal(): void {
    this.closeModal('login-modal');
    this.modalService.open('recovery-modal');
  };

  closeModal(id: string) {
    this.modalService.close(id);
  }

  async changePassword(e: Event) {
    e.preventDefault();
    const oldPassword = (<HTMLInputElement>document.getElementById('oldPassword')?.childNodes[0]).value;
    const newPassword = (<HTMLInputElement>document.getElementById('newPassword')?.childNodes[0]).value;
    const newPasswordConfirmation = (<HTMLInputElement>document.getElementById('newPasswordConfirmation')?.childNodes[0]).value;

    const changePasswordForm = (<HTMLFormElement>document.getElementById('change-password'))

    const mail = this.user?.email;

    await ApiService.login(mail!, oldPassword)
      .then(async () => {
        if(!(newPassword != newPasswordConfirmation)) {
          await ApiService.updateUserProfile({'password': newPassword}).finally(() => {
            this._toastService.success('Mot de passe changé');
            this.closeModal('change-password-modal');
            changePasswordForm.reset()
          })
        } else {
          this._toastService.error('Les deux mots de passes ne corespondent pas');
        }
      })
      .catch(() => this._toastService.error('Ancien mot de passe incorect'));
  }

  async archiveAccount(e: Event) {
    e.preventDefault();
    await ApiService.archicheAccount().then(() => {
      this.modalService.close('archive-account-validation-modal')
      updateSessionStorage({acessToken: undefined, refreshToken:undefined});
      location.reload();
    })
  }
}
