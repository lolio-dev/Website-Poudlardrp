import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Alert } from './components/modules/alert/alert';
import { Footer } from './components/modules/footer/footer';
import { Header } from './components/modules/header/header';
import { RestrictedComponent } from './components/modules/restricted-component/restricted-component';
import { Cart } from './components/views/cart/cart';
import { Gems } from './components/views/gems/gems';
import Home from './components/views/home/home';
import { NotFound } from './components/views/not-found/not-found';
import Product from './components/views/product/product';
import { ProfileView } from './components/views/profile/profile';
import { Quibbler } from './components/views/quibbler/quibbler';
import { Shop } from './components/views/shop/shop';
import { Cgu } from './components/views/terms/cgu/cgu';
import { Cgv } from './components/views/terms/cgv/cgv';
import { Thanks } from './components/views/thanks/thanks';
import { Transactions } from './components/views/transactions/transactions';
import { useToastify } from './hooks/useToastify';
import { CartService } from './models/resources/cart/cart.service';
import { ProfileService } from './models/resources/profile/profile.service';
import { updateSessionStorage } from './store/sesionStorage';
import { Profile } from './types/model/Profile';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  profile: Profile | undefined;
};

export const App: FunctionComponent<Props> = ({ profile }) => {
  const t = useTranslation();
  const { toastError, toastSuccess } = useToastify();
  const [query, setQuery] = useSearchParams();
  const [totalCartsQuantity, setTotalCartsQuantity] = useState<number>();
  const headerRef: any = useRef(null);
  const [loaded, setLoaded] = useState<boolean>();

  const restrictedLinks: string[] = ['/not-found'];

  window.scrollTo(0, 0);

  useEffect(() => {
    if (!loaded) {
      getTotalQuantity().finally(() => setLoaded(true));
    }

    query.forEach((v, k) => {

      switch (k) {
        case 'error':
          if (v === '[object Object]') {
            toastError("Vous devez vous connecter avec le compte minecraft associé à votre compte microsoft (vérifier votre compte actuellement connecté sur microsoft.com)");
          } else {
            toastError(t(v));
          }
          setQuery('');
          break;
        case 'success':
          toastSuccess(t(v));
          setQuery('');
          break;
        case 'access_token':
          setQuery('');
          exchangeAccessToken(v).finally(() => window.location.reload());
          break;
      }
    });
  }, [query, t, setQuery, toastError, toastSuccess, loaded]);

  const exchangeAccessToken = async (exchange: string) => {
    const token = await ProfileService.exchangeToken(exchange);
    updateSessionStorage({ accessToken: token });
  };

  const controlHeader = (e: any) => {
    if (e) {
      headerRef.current(e.target.className, e.target.textContent);
    }
  };

  const getTotalQuantity = async () => {
    if (profile) {
      try {
        setTotalCartsQuantity(await CartService.getTotalCartsQuantity());
      } catch (e) {
        toastError();
      }
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <div onClick={(e: any) => (headerRef ? controlHeader(e) : undefined)}>
      <ToastContainer />
      <RestrictedComponent restrictedLinks={restrictedLinks}>
        <Header profile={profile} fref={headerRef} totalCartsQuantity={totalCartsQuantity!} />
        <Alert profile={profile}></Alert>
      </RestrictedComponent>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop profile={profile} />} />
        <Route path="/quibbler" element={<Quibbler />} />
        <Route
          path="/products/:id"
          element={<Product updateTotalCartsQuantity={getTotalQuantity} profile={profile} />}
        />
        <Route path="/profile" element={<ProfileView profileProps={profile} />} />
        <Route path="/transactions" element={<Transactions profile={profile} />} />
        <Route
          path="/cart"
          element={<Cart profile={profile} updateTotalCartsQuantity={getTotalQuantity} />}
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/terms-cgu" element={<Cgu />} />
        <Route path="/terms-cgv" element={<Cgv />} />
        <Route path="/gems" element={<Gems profile={profile} />} />
        <Route path="/thanks" element={<Thanks profile={profile} />} />
        <Route path="*" element={<Navigate to="not-found" />} />
      </Routes>
      <RestrictedComponent restrictedLinks={restrictedLinks}>
        <Footer />
      </RestrictedComponent>
    </div>
  );
};
