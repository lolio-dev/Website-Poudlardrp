import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { FaBars, FaGlobe, FaLuggageCart } from 'react-icons/fa';
import { useTranslation } from 'react-multi-lang';
import { Link, useNavigate } from 'react-router-dom';

import { langages } from '../../../assets/datas/langages';
import { private_links } from '../../../assets/datas/private_links';
import { public_links } from '../../../assets/datas/public_links';
import { AuthService } from '../../../models/resources/auth/auth.service';
import { Profile } from '../../../types/model/Profile';
import { Dropdown } from '../../elements/dropdown/dropdown';
import { Gem } from '../../elements/gem/gem';

import styles from './header.module.scss';

type Props = {
  profile: Profile | undefined;
  fref: any;
  totalCartsQuantity: number;
};

export const Header: FunctionComponent<Props> = ({ profile, fref, totalCartsQuantity }) => {
  const [loaded, setLoaded] = useState(false);
  const [isNavOpen, toggleNav] = useState(false);

  const itemsRef: any = useRef({});

  const t = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      fref.current = closeDropDowns;
      setLoaded(true);
    }
  }, [loaded, fref]);

  const handleLogin = () => {
    AuthService.login();
  };

  const handleNav = () => {
    toggleNav(false);
  };

  const closeDropDowns = (className: string, label: string) => {
    if (!className[0] || !className.includes('dropdownButton')) {
      Object.values(itemsRef.current).forEach((r: any) => {
        try {
          r && r();
        } catch (error) {
          return;
        }
      });
    } else {
      Object.keys(itemsRef.current)
        .filter(o => o !== label)
        .map(k => itemsRef.current[k]());
    }
  };

  return (
    <header className={`${styles.header} ${isNavOpen ? styles.dark : styles.primary}`}>
      <nav className={styles.nav}>
        <Link to={'/'} className={styles.link} onClick={handleNav}>
          <h1>Poudlard RP</h1>
        </Link>
        <FaBars className={styles.hamburger} onClick={() => toggleNav(!isNavOpen)} />
        <section className={`${styles.links} ${isNavOpen ? styles.navOpen : styles.navHidden}`}>
          <div className={styles.container}>
            <div className={styles.public}>
              {Object.keys(public_links).map((key, index) => {
                return (
                  <div
                    key={index}
                    ref={(el: any) => (itemsRef.current[t(public_links[key].title)] = el)}
                  >
                    <Dropdown
                      label={t(public_links[key].title)}
                      links={public_links[key].links}
                      fref={itemsRef}
                      onNav={handleNav}
                    />
                  </div>
                );
              })}
              <Link to={'/quibbler'} className={styles.link} onClick={handleNav}>
                Actualités
              </Link>
            </div>
            <div className={styles.private}>
              {profile ? (
                <div className={styles.infos}>
                  {Object.keys(private_links).map((key, index) => (
                    <div key={index} ref={(el: any) => (itemsRef.current[profile.username] = el)}>
                      <Dropdown
                        label={profile.username}
                        fref={itemsRef}
                        links={private_links[key].links}
                        minWidth={175}
                        onNav={handleNav}
                        className={styles.dropdown}
                      />
                    </div>
                  ))}

                  <div className={styles.cart} onClick={() => navigate('/cart')}>
                    <FaLuggageCart className={styles.icon} />
                    <span className={styles.badge}>{totalCartsQuantity}</span>
                  </div>

                  <Link className={styles.gems} to="/gems">
                    <p>{profile.gems}</p>
                    <Gem width={24} height={24} />
                  </Link>
                </div>
              ) : (
                <button
                  className={styles.signin_microsoft}
                  id="sign-in"
                  type="button"
                  onClick={handleLogin}
                >
                  <img
                    src="https://docs.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-azure-ad-apps/ms-symbollockup_mssymbol_19.svg"
                    alt=""
                  />
                  <p>{t('header.nav.profile.microsoft.signin')}</p>
                </button>
              )}
              <div className={styles.lang}>
                {Object.keys(langages).map((key, index) => {
                  return (
                    <div key={index} ref={(el: any) => (itemsRef.current['lang'] = el)}>
                      <Dropdown
                        label={'lang'}
                        fref={itemsRef}
                        icon={<FaGlobe />}
                        minWidth={50}
                        links={langages[key].actions}
                        onNav={handleNav}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </nav>
    </header>
  );
};
