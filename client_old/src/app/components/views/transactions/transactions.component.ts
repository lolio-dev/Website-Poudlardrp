import { Component, OnInit } from '@angular/core';
import { loadFromSessionStorage } from "../../../store";
import {ActivatedRoute, Router} from "@angular/router";
import { User } from "../../../types/User";
import {Transaction} from "../../../types/Transaction";
import {ApiService} from "../../../model/Api.service";
import fileDownload from "js-file-download";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public loaded: boolean = false;
  public user?: User;

  private userToken = loadFromSessionStorage()?.acessToken;

  public transactions?: Transaction[];

  constructor(private route: ActivatedRoute, private router: Router, private _toastService: ToastService) { }

  ngOnInit(): void {
    if (!this.userToken) {
      this.router.navigate(['/']).then();
    }

    Promise.all([this.loadUser(), this.loadTransactions()]).finally(() => this.loaded = true)
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user;
      }
    );
  }

  async loadTransactions(){
    this.transactions = await ApiService.getTransactionsFromUserID();
  }

  async download(transaction: Transaction){
    ApiService.getTransactionPdf(transaction.transactionsId)
      .then((data: any) => {
        const blob = new Blob([data], { type: "application/pdf" });
        fileDownload(blob, `facture-${transaction.transactionsId}.pdf`);
      })
      .catch(() => this._toastService.error('Oups ! Il y a une erreur veuillez réessayer ultérieurement'));
  }
}
