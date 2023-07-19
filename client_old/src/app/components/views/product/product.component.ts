import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ItemTypes} from 'src/app/enums/Items/ItemsTypes';
import {Product} from '../../../types/Product';
import {ButtonTypes} from '../../../enums/Button/ButtonTypes';
import {Colors} from '../../../enums/Colors';
import {Sizes} from '../../../enums/Sizes';
import {getSimilarItem} from "../../../../utils/items";
import {User} from 'src/app/types/User';
import {ApiService} from "../../../model/Api.service";
import {loadFromSessionStorage} from "../../../store";
import {ModalService} from "../../../services/modal.service";
import {ToastService} from "angular-toastify";
import {CartItem} from "../../../types/CartItem";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public loaded: boolean = false;
  public user?: User;

  public item?: Product;
  private items?: Product[]
  public similarItems?: Product[];
  public itemPrice?: number;
  private itemId?: number;

  public itemCardType = ItemTypes.colored;
  private productQuantity: number = 1;
  public productPrice: number = 0;

  public btnTypes = ButtonTypes;
  public btnSizes = Sizes;
  public colors = Colors;

  private cart?: CartItem[]


  private userToken = loadFromSessionStorage()?.acessToken;

  private requestDone: boolean = true;

  basketBtnClass: string = 'btn btn--secondary--outline--rounded btn--mix';
  priceBtnClass: string = 'btn btn--dark--outline--rounded btn--mix';

  updatePrice(value: any) {
    this.productQuantity = value.value;
    this.productPrice = value.value * this.itemPrice!;
  }

  async handleAddBasket() {

    if (!this.userToken) {
      this.openModal('login-modal')
      return
    }

    const cart: CartItem | undefined = this.cart?.find((item: CartItem) => item.product.productId === this.itemId!)

    if (cart && this.requestDone) {
      this.requestDone = false
      try {
        const newQuantity: number = cart.quantity += this.productQuantity
        await ApiService.updateCartFromCartId(cart.cartId!, newQuantity)
          .then((data) => {
            if (data.status === 200) {
              this._toastService.success('Element ajouté au panier')
            }
          })
          .finally(async () => {
            await this.loadCart().finally(() => this.requestDone = true)
          })
      } catch (e) {
        this._toastService.error('Une erreur s\'est produite')
      }
    } else if (this.requestDone) {
      this.requestDone = false
      try {
        await ApiService.createNewCart({ productId: this.itemId!, quantity: this.productQuantity, userId: this.user?.userId! })
          .then((data) => {
            if (data.status === 201) {
              this._toastService.success('Element ajouté au panier')
            }
          })
          .finally(async () => {
            await this.loadCart().finally(() => this.requestDone = true)
          })
      } catch(e) {
        this._toastService.error('Une erreur s\'est produite')
      }
    }
  }

  constructor(private route: ActivatedRoute, private router: Router, private modalService: ModalService, private _toastService: ToastService) {}

  async loadItems(){
    this.items = await ApiService.getProducts();
    this.item = this.items.find(item => item.productId === this.itemId);

    if (!this.item) {
      this.router.navigate(['/']).then();
    }

    this.itemPrice = this.item?.price;
    this.updatePrice({ value: 1 })

    this.similarItems = getSimilarItem(this.item!, 3, this.items!)
  }

  async loadCart() {
    if (this.userToken) {
      const carts = await ApiService.getCartsFromUser();
      this.cart = carts.carts
    }
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = parseInt(params.id);
      Promise.all([this.loadUser(), this.loadItems(), this.loadCart()]).finally(() => {
        this.loaded = true
        this.item = this.items?.find((item: Product) => item.productId === this.itemId)})
    });
  }

  openModal(modalId: string) {
    this.modalService.open(modalId)
  }
}
