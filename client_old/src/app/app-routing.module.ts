import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/views/cart/cart.component';
import { HomeComponent } from './components/views/home/home.component';
// import { LauncherComponent } from './components/views/launcher/launcher.component';
import { NotFoundComponent } from './components/views/not-found/not-found.component';
import { ProfileComponent } from './components/views/profile/profile.component';
import { QuibblerComponent } from './components/views/quibbler/quibbler.component';
import { ShopComponent } from './components/views/shop/shop.component';
// import { VoteComponent } from './components/views/vote/vote.component';
// import { WikiComponent } from './components/views/wiki/wiki.component';
import { ProductComponent } from './components/views/product/product.component';
import { loadFromSessionStorage } from './store';
import { ApiService } from './model/Api.service';
import { getUserUuid } from 'src/utils/user';
import { TransactionsComponent } from './components/views/transactions/transactions.component';
import { GemsComponent } from './components/views/gems/gems.component';
import { TermsCguComponent } from './components/views/terms-cgu/terms-cgu.component';
import { TermsCgvComponent } from './components/views/terms-cgv/terms-cgv.component';
import { ThanksComponent } from './components/views/thanks/thanks.component';
import { WipComponent } from './components/views/wip/wip.component';
import {RecoverPasswordComponent} from "./components/views/recover-password/recover-password.component";

const token = loadFromSessionStorage()?.acessToken;
const userId = token ? getUserUuid(token) : undefined;
const user =  userId ? ApiService.getUserByUuid(userId) : undefined;

const routes: Routes = [
  { path: '', component: HomeComponent, data: {user} },
  { path: 'launcher', component: WipComponent, data: {user} },
  { path: 'shop', component: ShopComponent, data: {user} },
  { path: 'quibbler', component: QuibblerComponent, data: {user} },
  { path: 'wiki', component: WipComponent, data: {user} },
  { path: 'vote', component: WipComponent, data: {user} },
  { path: 'profile', component: ProfileComponent, data: {user} },
  { path: 'cart', component: CartComponent, data: {user} },
  { path: 'product/:id', component: ProductComponent, data: {user} },
  { path: 'gems', component: GemsComponent, data: {user}},
  { path: 'transactions', component: TransactionsComponent, data: {user} },
  { path: 'terms-cgu', component: TermsCguComponent, data: {user} },
  { path: 'terms-cgv', component: TermsCgvComponent, data: {user} },
  { path: 'thanks', component: ThanksComponent, data: {user} },
  { path: 'wip', component: WipComponent, data: {user} },
  { path: 'recover_password', component: RecoverPasswordComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
