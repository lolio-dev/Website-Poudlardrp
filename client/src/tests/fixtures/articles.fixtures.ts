import { Article } from '../../types/model/Article';

export const articles: Article[] = [
  {
    newsId: 'cd3f36b7-20a9-434f-8c95-87fb6bc6f3a0',
    title: 'Ouverture publique',
    subtitle: 'Préparez vos valises',
    text: "Poudlard ouvre ses portes à tous. Rejoignez l'aventure à l'adresse play.poudlardrp.fr",
    date: 1636392476148,
    image: 'https://minecraft.fr/forum/attachments/wo-jpg.69143/',
    status: 'ENABLE',
  },
  {
    newsId: 'c5c45313-16bd-40c8-b9fa-1fc828849a0d',
    title: 'Alpha test',
    subtitle: 'Venez tester',
    text: 'Inscrivez vous pour tester le serveur depuis notre discord',
    date: 1636392402941,
    image: 'https://minecraft.fr/forum/attachments/batou109933830-png.63633/',
    status: 'ENABLE',
  },
  {
    newsId: '731ddf80-c1e7-42af-b10e-fcb82372f6ff',
    title: 'Maintenance',
    subtitle: 'Nous revenons vers vous',
    text: 'Une panne de notre hébergeur a eu lieu, on réouvre dès que possible',
    date: 1636358860404,
    image: 'http://www.szerszambirodalom.hu/templates/wse/main.png',
    status: 'ENABLE',
  },
  {
    newsId: '3559c9f8-c417-4b4e-9c2b-9794b7352ce2',
    title: 'Bonne année',
    subtitle: 'Tournée de bièraubeurre',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nulla ut tortor blandit posuere. Maecenas suscipit ante vel mauris auctor finibus. Ut lacinia venenatis ex in tincidunt. Integer a augue lectus. Morbi vel augue risus.',
    date: 1635000060404,
    image: 'https://i.pinimg.com/236x/bd/29/df/bd29df12500af2714de943dd674f29c7.jpg',
    status: 'ENABLE',
  },
  {
    newsId: '6007e55c-2766-4478-874a-ccab9b6e97fe',
    title: 'Joyeux Halloween',
    subtitle: 'Bouh',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nulla ut tortor blandit posuere. Maecenas suscipit ante vel mauris auctor finibus. Ut lacinia venenatis ex in tincidunt. Integer a augue lectus. Morbi vel augue risus.',
    date: 1620058860404,
    image: 'https://i.pinimg.com/originals/02/a5/31/02a53128e5ec541d4af646cb10317177.jpg',
    status: 'ENABLE',
  },
  {
    newsId: 'ddc11f85-0f1b-4418-a961-6e32d247466a',
    title: 'Bonne rentrée',
    subtitle: 'Tous à bord',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nulla ut tortor blandit posuere. Maecenas suscipit ante vel mauris auctor finibus. Ut lacinia venenatis ex in tincidunt. Integer a augue lectus. Morbi vel augue risus.',
    date: 1586358860404,
    image: 'https://www.muggle-v.com/wp-content/uploads/2012/06/platform934-1.jpg',
    status: 'ENABLE',
  },
];

export const EnabledArticle: Article = {
  newsId: 'cd3f36b7-20a9-434f-8c95-87fb6bc6f3a0',
  title: 'Ouverture publique',
  subtitle: 'Préparez vos valises',
  text: "Poudlard ouvre ses portes à tous. Rejoignez l'aventure à l'adresse play.poudlardrp.fr",
  date: 1636392476148,
  image: 'https://minecraft.fr/forum/attachments/wo-jpg.69143/',
  status: 'ENABLE',
};

export const DisabledArticle: Article = {
  newsId: 'cd3f36b7-20a9-434f-8c95-87fb6bc6f3a0',
  title: 'Ouverture publique',
  subtitle: 'Préparez vos valises',
  text: "Poudlard ouvre ses portes à tous. Rejoignez l'aventure à l'adresse play.poudlardrp.fr",
  date: 1636392476148,
  image: 'https://minecraft.fr/forum/attachments/wo-jpg.69143/',
  status: 'DISABLE',
};
