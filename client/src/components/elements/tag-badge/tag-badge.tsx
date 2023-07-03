import { sample } from 'lodash';
import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { BsTagsFill } from 'react-icons/bs';
import { FaDragon, FaHatWizard, FaStar } from 'react-icons/fa';

import { Colors } from '../../../types/enums/Colors';
import { Badge } from '../badge/badge';

interface Props {
  tag: string;
}

const TagBadge: FunctionComponent<Props> = ({ tag }) => {
  const [icon, setIcon] = useState<ReactElement>();
  const [color, setColor] = useState<Colors>();

  useEffect(() => {
    setColor(sample([Colors.primary, Colors.secondary, Colors.green, Colors.blue, Colors.dark]));

    switch (tag) {
      case 'hat':
        setIcon(<FaHatWizard />);
        break;
      case 'pets':
        setIcon(<FaDragon />);
        break;
      case 'title':
        setIcon(<BsTagsFill />);
        break;
      default:
        setIcon(<FaStar />);
    }
  }, [tag]);

  if (icon && color) {
    return <Badge value={tag} icon={icon} backgroundColor={color} />;
  }

  return null;
};

export { TagBadge };
