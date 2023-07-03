import React from 'react';
import ReactDOM from 'react-dom/client';
import { setDefaultLanguage, setTranslations } from 'react-multi-lang';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';
import { default_langage } from './constants';
import { ProfileService } from './models/resources/profile/profile.service';
import reportWebVitals from './reportWebVitals';
import { loadFromSessionStorage } from './store/sesionStorage';
import { translations } from './translations';
import { Profile } from './types/model/Profile';

import './style/main.scss';
import './style/normalise.css';

const token = loadFromSessionStorage()?.accessToken;

let profile: Profile | undefined = undefined;

// Init translations
setTranslations(translations);
setDefaultLanguage(default_langage);

const loadProfile = async () => {
  if (token) {
    profile = await ProfileService.getProfile();
  }
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const render = (profile: Profile | undefined) => (
  <React.StrictMode>
    <BrowserRouter>
      <App profile={profile} />
    </BrowserRouter>
  </React.StrictMode>
);

if (token) {
  Promise.all([loadProfile()]).finally(() => {
    root.render(render(profile));
  });
} else {
  root.render(render(undefined));
}

reportWebVitals();
