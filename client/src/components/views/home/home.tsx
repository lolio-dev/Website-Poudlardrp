import { FunctionComponent, useRef } from 'react';
import { FaHatWizard } from 'react-icons/fa';
import { GiGriffinShield, GiLunarWand, GiSnakeTongue } from 'react-icons/gi';
import { useTranslation } from 'react-multi-lang';

import hogwarts from '../../../assets/images/backgrounds/hogwarts.webp';
import ekalia_logo from '../../../assets/images/logos/ekalia_logo.webp';
import minecraftfr_logo from '../../../assets/images/logos/minecraftfr_logo.webp';
import nihost_logo from '../../../assets/images/logos/nihost_logo.svg';
import { homeBanners, ip } from '../../../constants';
import { Banner } from '../../elements/banner/banner';

import styles from './home.module.scss';
import { Logo } from "../../elements/logo/logo";
import { Sizes } from "../../../types/enums/Sizes";


const Home: FunctionComponent = () => {
  const t = useTranslation();
  const copyPopup: any = useRef(null);

  const handleCopy = () => {
    copyPopup.current.style.display = 'block';
    navigator.clipboard.writeText(ip);
  };

  const removePopup = () => {
    copyPopup.current.style.display = 'none';
  };

  return (
    <main className={styles.main}>
      <Banner
        alt="A banner that represent the in game server"
        images={homeBanners}
      >
        <div className={styles.infos} onClick={handleCopy} onAnimationEnd={removePopup}>
          <div ref={copyPopup} className={styles.copyPopup}>
            {t('home.copy')}
            <FaHatWizard/>
          </div>
          <div className={styles.logo}>
            <Logo size={Sizes.mini}/>
          </div>
          <div className={styles.primaryInfos}>
            <p>{ip}</p>
            <p>1.18.2</p>
          </div>
        </div>
        <a href={'#presentation'} className={styles.scrollIndicator}></a>
      </Banner>
      <section className={styles.content} id={'presentation'}>
        <article className={styles.summary}>
          <h2>{t('home.summary.title')}</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <GiLunarWand className={styles.items}></GiLunarWand>
              <h3>{t('home.stats.spells')}</h3>
            </div>
            <div className={styles.stat}>
              <GiGriffinShield className={styles.items}></GiGriffinShield>
              <h3>{t('home.stats.adventure')}</h3>
            </div>
            <div className={styles.stat}>
              <GiSnakeTongue className={styles.items}></GiSnakeTongue>
              <h3>{t('home.stats.boss')}</h3>
            </div>
          </div>
        </article>
        <article className={styles.presentation}>
          <img src={hogwarts} alt=""/>
          <p>
            {t('home.presentation.part1')}
            <b>{t('home.presentation.server_type')}</b>
            {t('home.presentation.part2')}
          </p>
          <p className={styles.bold}>{t('home.presentation.part3')}</p>
        </article>
        <article className={styles.trailer}>
          <iframe width="1920" height="768" src="https://www.youtube.com/embed/MtdLXfPThwg"
                  title="POUDLARDRP TRAILER - A New Story [Minecraft 1.18.2]" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
        </article>
        <article className={styles.partners}>
          <h1>{t('home.partners.title')}</h1>
          <div className={styles.partnerList}>
            <div className={styles.partner}>
              <a href="https://ekalia.fr">
                <img src={ekalia_logo} alt=""/>
              </a>
            </div>
            <div className={styles.partner}>
              <a href="https://www.ni-host.com">
                <img src={nihost_logo} alt=""/>
              </a>
            </div>
            <div className={styles.partner}>
              <a href="https://minecraft.fr">
                <img src={minecraftfr_logo} alt=""/>
              </a>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Home;
