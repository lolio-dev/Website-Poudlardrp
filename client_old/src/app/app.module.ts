import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/views/home/home.component';
import { LauncherComponent } from './components/views/launcher/launcher.component';
import { ShopComponent } from './components/views/shop/shop.component';
import { QuibblerComponent } from './components/views/quibbler/quibbler.component';
import { WikiComponent } from './components/views/wiki/wiki.component';
import { HeaderComponent } from './components/modules/header/header.component';
import { NotFoundComponent } from './components/views/not-found/not-found.component';
import { VoteComponent } from './components/views/vote/vote.component';
import { ProfileComponent } from './components/views/profile/profile.component';
import { ButtonComponent } from './components/elements/button/button.component';

import { LogoComponent } from './components/elements/logo/logo.component';
import { CartComponent } from './components/views/cart/cart.component';

import { BannerComponent } from './components/elements/banner/banner.component';
import { FooterComponent } from './components/modules/footer/footer.component';
import { NewsComponent } from './components/modules/news/news.component';
import { ItemsComponent } from './components/modules/items/items.component';
import { ModalComponent } from './components/modules/modal/modal.component';
import { InputComponent } from './components/elements/input/input.component';
import { ProductComponent } from './components/views/product/product.component';
import { NumberInputComponent } from './components/elements/number-input/number-input.component';
import { LoadingComponent } from './components/views/loading/loading.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { TransactionsComponent } from './components/views/transactions/transactions.component';
import { GemsComponent } from './components/views/gems/gems.component';
import { GemsOfferComponent } from './components/modules/gems-offer/gems-offer.component';
import { TermsCguComponent } from './components/views/terms-cgu/terms-cgu.component';
import { TermsCgvComponent } from './components/views/terms-cgv/terms-cgv.component';
import { ThanksComponent } from './components/views/thanks/thanks.component';
import { WipComponent } from './components/views/wip/wip.component';
import { RecoverPasswordComponent } from './components/views/recover-password/recover-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LauncherComponent,
    ShopComponent,
    QuibblerComponent,
    WikiComponent,
    HeaderComponent,
    NotFoundComponent,
    VoteComponent,
    ProfileComponent,
    TransactionsComponent,
    CartComponent,
    ButtonComponent,
    LogoComponent,
    BannerComponent,
    FooterComponent,
    NewsComponent,
    ItemsComponent,
    ProductComponent,
    NumberInputComponent,
    ModalComponent,
    InputComponent,
    ProductComponent,
    NumberInputComponent,
    LoadingComponent,
    GemsComponent,
    GemsOfferComponent,
    TermsCguComponent,
    TermsCgvComponent,
    ThanksComponent,
    WipComponent,
    RecoverPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AngularToastifyModule,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
