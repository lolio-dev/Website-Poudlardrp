import { FunctionComponent } from 'react';
import { useTranslation } from 'react-multi-lang';

import styles from './cgu.module.scss';

export const Cgu: FunctionComponent = () => {
  const t = useTranslation();

  return (
    <main className={styles.main}>
      <h2>{t('cgu.definitions.title')}</h2>
      <p>
        <b>{t('cgu.definitions.client.key')}</b>
        {`${t('cgu.definitions.client.value')}\n`}
        <b>{t('cgu.definitions.services.key')}</b>
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.definitions.services.value')}
      </p>

      <p>
        <b>{t('cgu.definitions.content.key')}</b>
        {t('cgu.definitions.content.value')}
      </p>

      <p>
        <b>{t('cgu.definitions.informations.key')}</b>
        {t('cgu.definitions.informations.value')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.definitions.informations.value2')}
      </p>

      <p>
        <b>{t('cgu.definitions.users.key')}</b>
        {t('cgu.definitions.users.value')}
      </p>
      <p>
        <b>{t('cgu.definitions.personals.key')}</b>
        {t('cgu.definitions.personals.value')}
      </p>
      <p>{t('cgu.definitions.terms.value')}</p>

      <h2>{t('cgu.presentation.title')}</h2>
      <p>
        {t('cgu.presentation.descritpion')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.presentation.description2')}
      </p>
      <p>
        <strong>{t('cgu.presentation.owner.key')}</strong>
        {`${t('cgu.presentation.owner.value')}\n`}

        <strong>{t('cgu.presentation.responsible.key')}</strong>
        {t('cgu.legya')}
        {`${t('cgu.presentation.responsible.value')}\n`}

        <strong>{t('cgu.presentation.webmaster.key')}</strong>
        {`${t('cgu.presentation.webmaster.value')}\n`}

        <strong>{t('cgu.presentation.host.key')}</strong>
        {`${t('cgu.presentation.host.value')}\r\n`}

        <strong>{t('cgu.presentation.protection_officer.key')}</strong>
        {t('cgu.legya')}
      </p>

      <h2>{t('cgu.conditions.title')}</h2>

      <p>{t('cgu.conditions.paragraph')}</p>

      <p>
        {t('cgu.conditions.paragraph2.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.conditions.paragraph2.sentence2')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.conditions.paragraph2.sentence3')}
      </p>

      <p>
        {t('cgu.conditions.paragraph3.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.conditions.paragraph3.sentence2')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.conditions.paragraph3.sentence3')}
      </p>

      <h2>{t('cgu.services.title')}</h2>

      <p>
        {t('cgu.services.paragraph.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.services.paragraph.sentence2')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.services.paragraph.sentence3')}
      </p>

      <p>{t('cgu.services.paragraph2')}</p>

      <h2>{t('cgu.limits.title')}</h2>

      <p>
        {t('cgu.limits.paragraph.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.limits.paragraph.sentence2')}
      </p>

      <p>{t('cgu.limits.paragraph2')}</p>

      <p>
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.limits.paragraph3')}
      </p>

      <h2>{t('cgu.intellectual.title')}</h2>

      <p>
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.intellectual.paragraph')}
        <a href="/">{t('cgu.site_link')}</a>
      </p>

      <p>{t('cgu.intellectual.paragraph2')}</p>

      <h2>{t('cgu.responsability.title')}</h2>

      <p>{t('cgu.responsability.paragraph.sentence')}</p>

      <p>{t('cgu.responsability.paragraph2')}</p>

      <p>
        {t('cgu.responsability.paragraph3.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.responsability.paragraph3.sentence2')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.responsability.paragraph3.sentence3')}
      </p>

      <h2>{t('cgu.personal_datas.title')}</h2>

      <p>{t('cgu.personal_datas.paragraph')}</p>

      <h3>{t('cgu.personal_datas.collect.title')}</h3>

      <p>
        {t('cgu.personal_datas.collect.paragraph.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.personal_datas.collect.paragraph.sentence2')}
      </p>

      <p>
        {t('cgu.personal_datas.collect.paragraph2.sentence')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.collect.paragraph2.sentence2')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.collect.paragraph2.sentence3')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.collect.paragraph2.sentence4')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.collect.paragraph2.sentence5')}
      </p>

      <h3>{t('cgu.personal_datas.purposes.title')}</h3>

      <p>
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.purposes.list.description')}
      </p>

      <ul>
        <li>{t('cgu.personal_datas.purposes.list.sentence')}</li>
        <li>{t('cgu.personal_datas.purposes.list.sentence2')}</li>
        <li>{t('cgu.personal_datas.purposes.list.sentence3')}</li>

        <li>{t('cgu.personal_datas.purposes.list.sentence4')}</li>
        <li>{t('cgu.personal_datas.purposes.list.sentence5')}</li>
      </ul>

      <p>
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.purposes.list.sentence6')}
      </p>

      <h3>{t('cgu.personal_datas.access.title')}</h3>

      <p>{t('cgu.personal_datas.access.list.description')}</p>
      <ul>
        <li>{t('cgu.personal_datas.access.list.sentence')}</li>
        <li>{t('cgu.personal_datas.access.list.sentence2')}</li>
        <li>{t('cgu.personal_datas.access.list.sentence3')}</li>
        <li>{t('cgu.personal_datas.access.list.sentence4')}</li>
        <li>{t('cgu.personal_datas.access.list.sentence5')}</li>
      </ul>

      <p>
        {t('cgu.personal_datas.access.paragraph.sentence')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.access.paragraph.sentence2')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.access.paragraph.sentence3')}
      </p>

      <p>
        {t('cgu.personal_datas.access.paragraph2.sentence')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.access.paragraph2.sentence2')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.access.paragraph2.sentence3')}
      </p>

      <p>
        {t('cgu.personal_datas.access.paragraph2.address')}{' '}
        {t('cgu.personal_datas.access.paragraph2.address2')}
      </p>

      <p>
        {t('cgu.personal_datas.access.paragraph3.sentence')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.access.paragraph3.sentence2')}
      </p>

      <p>
        {t('cgu.personal_datas.access.paragraph4.sentence')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.access.paragraph4.sentence2')}
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.personal_datas.access.paragraph4.sentence3')}
      </p>

      <h3>{t('cgu.personal_datas.communication.title')}</h3>

      <p>
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.personal_datas.communication.paragraph.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.personal_datas.communication.paragraph.sentence2')}
      </p>

      <p>
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.personal_datas.communication.paragraph2.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.personal_datas.communication.paragraph2.sentence2')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.personal_datas.communication.paragraph2.sentence3')}
      </p>

      <p>
        {t('cgu.personal_datas.communication.paragraph3.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.personal_datas.communication.paragraph3.sentence2')}
      </p>
      <p>{t('cgu.personal_datas.communication.paragraph4')}</p>

      <div ng-bind-html="rgpdHTML"></div>

      <h2>{t('cgu.notification.title')}</h2>
      <p>{t('cgu.notification.paragraph')}</p>
      <p>
        {t('cgu.notification.paragraph2.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.notification.paragraph2.sentence2')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.notification.paragraph2.sentence3')}
        <a href="/">{t('cgu.site_link')}</a>
      </p>

      <h3>{t('cgu.notification.security.title')}</h3>

      <p>
        {t('cgu.notification.security.paragraph.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.notification.security.paragraph.sentence2')}
      </p>

      <p>
        {t('cgu.notification.security.paragraph2.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.notification.security.paragraph2.sentence2')}
      </p>

      <h2>{t('cgu.hypertext.title')}</h2>
      <p>
        {t('cgu.hypertext.paragraph.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.paragraph.sentence2')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.paragraph.sentence3')}
      </p>
      <p>{t('cgu.hypertext.paragraph2')}</p>

      <h3>{t('cgu.hypertext.cookies.title')}</h3>
      <p>{t('cgu.hypertext.cookies.paragraph')}</p>
      <p>
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.cookies.paragraph2.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.cookies.paragraph2.sentence2')}
      </p>
      <p>
        {t('cgu.hypertext.cookies.paragraph3.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.cookies.paragraph3.sentence2')}
      </p>
      <p>
        {t('cgu.hypertext.cookies.paragraph4.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.cookies.paragraph4.sentence2')}
      </p>
      <p>
        {t('cgu.hypertext.cookies.paragraph5.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.cookies.paragraph5.sentence2')}
      </p>
      <p>
        {t('cgu.hypertext.cookies.paragraph6.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.cookies.paragraph6.sentence2')}
      </p>
      <p>
        {t('cgu.hypertext.cookies.paragraph7.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.cookies.paragraph7.sentence2')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.cookies.paragraph7.sentence3')}
      </p>
      <p>
        {t('cgu.hypertext.cookies.paragraph8.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.cookies.paragraph8.sentence2')}
      </p>

      <h3>{t('cgu.hypertext.tags.title')}</h3>

      <p>
        <a href="/">{t('cgu.site_link')}</a> {t('cgu.hypertext.tags.paragraph')}
      </p>

      <p>{t('cgu.hypertext.tags.paragraph2')}</p>
      <p>
        {t('cgu.hypertext.tags.paragraph3.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.tags.paragraph3.sentence2')}
      </p>
      <p>
        {t('cgu.hypertext.tags.paragraph4.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.hypertext.tags.paragraph4.sentence2')}
      </p>
      <p></p>
      <h2>{t('cgu.juridiction.title')}</h2>
      <p>
        {t('cgu.juridiction.paragraph.sentence')}
        <a href="/">{t('cgu.site_link')}</a>
        {t('cgu.juridiction.paragraph.sentence2')}
      </p>
    </main>
  );
};
