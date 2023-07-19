import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {User} from "../../../types/User";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from 'src/app/model/Api.service';
import {loadFromSessionStorage} from 'src/app/store';
import {ToastService} from "angular-toastify";
import {translate} from "../../../../utils/errors";
import fileDownload from 'js-file-download'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public loaded: boolean = false;

  public user?: User;
  public users?: User[];

  public userUUID?: string;
  public isInModification: boolean = false;
  public photo: string = "";
  public inputs?: any;

  constructor(private modalService: ModalService, public router: Router, private route: ActivatedRoute, private _toastService: ToastService) {
  }

  ngOnInit(): void {
    if (!loadFromSessionStorage()?.acessToken) {
      this.router.navigate(['/']).then();
    }

    Promise.all([this.loadUser()]).finally(() => {
      this.loaded = true;
    });
  }

  async loadUser() {
    this.route.data.subscribe(
      async (data) => {
        this.user = await data.user;
        await this.loadPlayerHead();
      }
    );
  }

  async loadPlayerHead() {
    this.photo = this.user ? await ApiService.getPlayerHead(this.user.uuid) : "";
    console.log(this.photo);
  }

  openModal(modalId: string, e: Event) {
    e.preventDefault();
    this.modalService.open(modalId);
  }

  cancel() {
    this.reloadPage();
  }

  async apply(e: Event) {
    e.preventDefault();

    let inputsValues = {
      userName: (<HTMLInputElement>document.getElementById('nickname')?.childNodes[0]).value,
      firstName: (<HTMLInputElement>document.getElementById('firstName')?.childNodes[0]).value,
      lastName: (<HTMLInputElement>document.getElementById('lastName')?.childNodes[0]).value,
      address1: (<HTMLInputElement>document.getElementById('firstAddress')?.childNodes[0]).value,
      address2: (<HTMLInputElement>document.getElementById('secondAddress')?.childNodes[0]).value,
      postalCode: (<HTMLInputElement>document.getElementById('postalCode')?.childNodes[0]).value,
      email: (<HTMLInputElement>document.getElementById('email')?.childNodes[0]).value,
    };

    Object.entries(inputsValues).forEach(([key, value]) => {
      if (value === (this.user as any)[key]) {
        delete (inputsValues as any)[key]
      }
    })

    if (!(Object.keys(inputsValues).length)) {
      this.isInModification = false
      return
    }

    if (('userName' in inputsValues)) {
      await this.getUUID(inputsValues.userName).finally(async () => {
        if (this.userUUID) {
          (inputsValues as any)['uuid'] = this.userUUID
          await this.updateProfil(inputsValues)
        }
      })
    } else {
      await this.updateProfil(inputsValues)
    }
  }

  async getUserDatas() {
    ApiService.getUserDatas()
      .then((data: any) => fileDownload(data, 'data.md'))
      .catch(() => this._toastService.error('Oups ! Il y a une erreur veuillez réessayer ultérieurement'));
  }

  async updateProfil(data: Record<string, any>) {
    await ApiService.updateUserProfile(data)
      .then(() => location.reload())
      .catch(e => this._toastService.error(translate(e.error || e.message || e.toString())))
  }

  async getUUID(userName: string) {
    this.userUUID = await ApiService.getUUID(userName).catch(() => this._toastService.error('Aucun compte minecraft associé à ce pseudo'));
  }

  edit() {
    this.isInModification = true;
  }

  reloadPage() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/profile']));
  }
}
