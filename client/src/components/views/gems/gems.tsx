import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-multi-lang';

import { useToastify } from '../../../hooks/useToastify';
import { GemsService } from '../../../models/resources/gems/gem.service';
import { Gem } from '../../../types/model/Gem';
import { Profile } from '../../../types/model/Profile';
import { GemCard } from '../../modules/gem-card/gem-card';
import { Loading } from '../../modules/loading/loading';

import style from './gems.module.scss';

interface Props {
  profile?: Profile;
}

const Gems: FunctionComponent<Props> = ({ profile }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [gems, setGems] = useState<Gem[]>();

  const { toastError } = useToastify();
  const t = useTranslation();

  useEffect(() => {
    const getGems = async () => {
      try {
        setGems(await GemsService.getGems());
      } catch (e) {
        toastError();
      }
    };

    if (!loaded) {
      Promise.all([getGems()]).finally(() => setLoaded(true));
    }
  }, [loaded, toastError]);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <>
      <main className={style.main}>
        <header className={style.header}>
          <h1 className={style.title}>{t('gems.title')}</h1>
          <p className={style.description}>{t('gems.description')}</p>
        </header>

        <section className={style.gems}>
          {gems?.length ? (
            gems.map((gem: Gem) => (
              <GemCard key={gem.gemOfferId} className={style.gem} gem={gem} profile={profile} />
            ))
          ) : (
            <p className={style.noOffers}>Il n'y a pas d'offres de gemmes disponibles</p>
          )}
        </section>
      </main>
    </>
  );
};

export { Gems };
