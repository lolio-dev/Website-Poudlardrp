import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatten, uniq } from 'lodash';
import { Colors } from 'src/app/enums/Colors';
import { ItemTypes } from 'src/app/enums/Items/ItemsTypes';
import { Product } from 'src/app/types/Product';
import { ButtonTypes } from '../../../enums/Button/ButtonTypes';
import { User } from 'src/app/types/User';
import {ApiService} from "../../../model/Api.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  public loaded:boolean = false;
  public user?: User;

  //#region state
  public currentPrice: number = 1000;
  public maxPrice: number = 1000;
  public minPrice: number = 0;

  public category?:string;
  public products?: Product[];
  public tags: string[] = [];
  public activeFilters: string[] = [];
  //#endregion

  //#region style
  public btnTypes = ButtonTypes;
  public colors = Colors;
  public tagsBtnClass: string = 'btn btn--secondary--outline--rounded btn--small';
  public type = ItemTypes.colored;
  public shopProducts?: Product[];
  public style: 'inactive' | 'active' = 'inactive';
  //#endregion

  constructor(private route: ActivatedRoute) {
    this.route.queryParams
    .subscribe(params => {
        this.category = params.category;
        const productsByCategory = this.products?.filter(item => item.category === this.category);
        this.currentPrice = productsByCategory ? Math.max(...productsByCategory?.map((item: Product) => item.price) || [1000]) : this.currentPrice;
        this.filter();
      },
    );
  }

  ngOnInit(): void {
    Promise.all([this.loadUser(), this.loadItems()]).finally(() => {this.loaded = true})
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user
      }
    );
  }

  async loadItems(){
    this.products = await ApiService.getProducts();
    this.filter();
  }

  handleInput(evt: any) {
    const value = evt.target.value;
    const valueHtml = document.querySelector('.value');

    if (valueHtml) {
      valueHtml.children[0].textContent = value;
    }

    this.currentPrice = parseInt(value);
    this.filter();
  }

  handleFilter(evt: any) {
    const value: string = evt.toLowerCase().trim();
    const indexOf = this.activeFilters.indexOf(value);
    if (indexOf !== -1) {
      this.activeFilters.splice(indexOf, 1);
    } else {
      this.activeFilters.push(value);
    }
    this.filter();
  }

  filter() {
    const itemsByCategory = this.products?.filter((item: Product) => item.category === this.category);
    this.shopProducts = itemsByCategory?.filter((item: Product) => item.price <= this.currentPrice);
    this.shopProducts = this.shopProducts?.filter((item: Product) => this.activeFilters.length > 0 ? item.tags.some(tag => this.activeFilters.includes(tag)) : true);

    this.tags = uniq(flatten(this.shopProducts?.map(item => item.tags)));

    this.maxPrice = Math.max(...itemsByCategory?.map((item: Product) => item.price) || [1000])
    this.minPrice = Math.min(...itemsByCategory?.map((item: Product) => item.price) || [0])
  }
}
