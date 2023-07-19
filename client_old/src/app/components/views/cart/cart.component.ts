import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/types/User';
import {ActivatedRoute, Router} from '@angular/router';
import {loadFromSessionStorage} from "../../../store";
import {CartItem} from "../../../types/CartItem";
import {ApiService} from "../../../model/Api.service";
import {emitType} from "../../elements/number-input/number-input.component";
import { ModalService } from '../../../services/modal.service';
import { ToastService } from 'angular-toastify';
import { translate } from '../../../../utils/errors';
import { FullCart } from "../../../types/FullCart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent implements OnInit {
  public loaded: boolean = false;
  public user?: User;
  public cart?: FullCart;
  public totalPrice?: number;

  public primaryButtonClass: string = 'btn btn--large btn--validation--default--rounded';
  public secondaryButtonClass: string = 'btn btn--medium btn--dark--outline';

  constructor(private route: ActivatedRoute, public router: Router, private modalService: ModalService, private _toastService: ToastService) {}

  ngOnInit(): void {
    Promise.all([this.loadUser()]).finally(() => {
      this.loaded = true;
      this.setTotalPrice();
    })

    if (!loadFromSessionStorage()?.acessToken) {
      this.router.navigate(['/']).then();
    }
  }

  async loadCart() {
    this.cart = await ApiService.getCartsFromUser();

    this.totalPrice = this.cart.totalPrice;
  }

  async loadUser() {
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user
        this.loadCart().then()
      }
    );
  }

  async updateQuantity(e: emitType, cartId: number) {
    try {
      await ApiService.updateCartFromCartId(cartId, e.value)
      let item = this.getCartById(cartId)
      item!.quantity = e.value
      this.setTotalPrice()
    } catch (e) {}
  }

  getCartById(id: number) {
    return this.cart?.carts.find((cart: CartItem) => cart.cartId === id)
  }

  setTotalPrice() {
    let price: number = 0;

    this.cart?.carts.forEach((cart: CartItem) => {
      price += cart.product.price * cart.quantity
    })

    this.totalPrice = price
  }

  async handleDeleteCart(cartId: number) {
    try {
      await ApiService.deleteCartFromCartId(cartId);
      const cartIndex: number = this.cart?.carts.indexOf(this.getCartById(cartId)!)!
      this.cart?.carts.splice(cartIndex, 1)
      this.setTotalPrice()
    } catch (e) {}
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  async paidUserCart(){
    if(this.user?.userId){
      try {
        await ApiService.paidUserCart();
        window.location.href = "/thanks";
      } catch (error: any) {
        this._toastService.error(translate(error.error))
      }
    }
  }
}
