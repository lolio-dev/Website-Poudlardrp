import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/types/Banner';
import { ApiService } from 'src/app/model/Api.service';
import { News } from 'src/app/types/News';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/types/User';
import {Product} from "../../../types/Product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public loaded:boolean = false;
  public user?: User;

  public banner: Banner = {
    image: '../../../../assets/images/bannerHome.png',
    alt: 'Bannière représentant une vue du château',
  };

  public players: {online: number, max:number} = {online: 0, max: 100};
  public firstNews?: News = undefined;
  public firstShop?: Product

  public items?: Product[]

  constructor(private route:ActivatedRoute) {}

  ngOnInit(): void {
    Promise.all([this.getPlayers(), this.loadArticles(), this.loadUser(), this.loadItems()]).finally(() => {this.loaded = true})
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user
      }
    );
  }

  async getPlayers(){
    this.players = await ApiService.getPlayerConnected();
  }

  async loadArticles(){
    this.firstNews = await (await ApiService.getNews()).reverse()[0];
  }

  async loadItems(){
    this.items = await ApiService.getProducts();

    this.firstShop = this.items.reverse()[0];
  }
}
