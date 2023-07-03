import { FunctionComponent, useState } from 'react';
import { FaPaypal, FaStripeS } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { useTranslation } from 'react-multi-lang';

import gemImage from '../../../assets/images/gemImage.webp';
import { useToastify } from '../../../hooks/useToastify';
import { GemsService } from '../../../models/resources/gems/gem.service';
import { ButtonSizes } from '../../../types/enums/ButtonSizes';
import { ButtonTypes } from '../../../types/enums/ButtonTypes';
import { Colors } from '../../../types/enums/Colors';
import { Warnings } from '../../../types/enums/Warnings';
import { Gem } from '../../../types/model/Gem';
import { Profile } from '../../../types/model/Profile';
import Button from '../../elements/button/button';
import { Modal } from '../../elements/modal/modal';
import Separator from '../../elements/separator/separator';
import { TextInput } from '../../elements/text-input/text-input';

import style from './gem-card.module.scss';

interface Props {
  gem: Gem;
  className?: string;
  profile?: Profile;
}

const GemCard: FunctionComponent<Props> = ({ gem, className, profile }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>();

  const { toastWarning, toastError } = useToastify();
  const t = useTranslation();

  const handleCodeOnChange = (value: any) => {
    setCode(value.target.value);
  };

  const paidWithPaypal = async () => {
    try {
      await GemsService.paidGemsWithPaypal(gem.gemOfferId, code)
    } catch (e: any) {
      toastError(t(e.error));
    }
  }

  const paidWithStripe = async () => {
    try {
      await GemsService.paidGemsWithStripe(gem.gemOfferId, code)
    } catch (e: any) {
      toastError(t(e.error));
    }
  }

  return (
    <article
      onClick={
        profile ? () => setIsDetailModalOpen(true) : () => toastWarning(Warnings.NEED_TO_LOGIN)
      }
      className={`${style.card} ${className}`}
    >
      <header className={style.header}>
        <div className={style.details}>
          <h3 className={style.title}>Pack de {gem.gems}</h3>
          <p className={style.bonus}>Bonus: {gem.bonus}</p>
        </div>

        <div className={style.price}>
          <p>{gem.price} €</p>
        </div>
      </header>

      <img src={gemImage} alt="" className={style.image} />

      <Modal open={isDetailModalOpen} className={style.modal} setOpen={setIsDetailModalOpen}>
        <div className={style.modal__content}>
          <header className={style.modal__header}>
            <p className={style.modal__title}>Récapitulatif</p>
            <MdOutlineClose
              cursor={'pointer'}
              onClick={() => setIsDetailModalOpen(false)}
              className={style.modal__close}
            />
          </header>

          <Separator width={'100%'} />

          <div className={style.modal__details}>
            <p className={style.modal__detailContent}>
              <span className={style.modal__detailTitle}>{t('gemsModal.details.gem_number')}</span>{' '}
              <span>{gem.gems}</span>
            </p>
            <p className={style.modal__detailContent}>
              <span className={style.modal__detailTitle}>
                {t('gemsModal.details.gem_bonus_number')}
              </span>{' '}
              <span>{gem.bonus}</span>
            </p>

            <p className={style.modal__detailContent}>
              <span className={style.modal__detailTitle}>{t('gemsModal.details.price')}</span>{' '}
              <span>{gem.price}€</span>
            </p>
          </div>

          <TextInput
            id="promotion-code"
            label="Code partenaire"
            type="text"
            onChange={handleCodeOnChange}
            className={style.modal__code}
          />

          <div className={style.modal__actions}>
            <Button
              onClick={paidWithStripe}
              borderRadius={7}
              type={ButtonTypes.outlined}
              background={Colors.white}
              borderSize={1}
              borderColor={Colors.stripe}
              size={ButtonSizes.mini}
              color={Colors.stripe}
            >
              <div className={style.modal__actionContent}>
                <FaStripeS /> {t('gemsModal.actions.stripe')}
              </div>
            </Button>
            <Button
              onClick={paidWithPaypal}
              borderRadius={7}
              type={ButtonTypes.outlined}
              background={Colors.white}
              borderSize={1}
              borderColor={Colors.stripe}
              size={ButtonSizes.mini}
              color={Colors.paypal}
            >
              <div className={style.modal__actionContent}>
                <FaPaypal /> {t('gemsModal.actions.paypal')}
              </div>
            </Button>
          </div>
        </div>
      </Modal>
    </article>
  );
};

export { GemCard };
