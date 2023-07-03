import { difference } from 'lodash';
import { FunctionComponent } from 'react';
import { FaStar } from 'react-icons/fa';

import { ProductRarity } from '../../../types/enums/ProductRarity';
import { Badge } from '../../elements/badge/badge';
import { TagBadge } from '../../elements/tag-badge/tag-badge';

interface Props {
  rarity?: ProductRarity;
  tags?: string[];
  className?: string;
}

const ProductBadges: FunctionComponent<Props> = ({ rarity, tags, className = '' }) => {
  if (!rarity && !tags) return null;

  return (
    <div className={className} data-testid="badges">
      {rarity && <Badge value={rarity} className={rarity} icon={<FaStar />} />}
      {difference(tags, Object.values(ProductRarity)).map((tag: string) => (
        <TagBadge key={tag} tag={tag} />
      ))}
    </div>
  );
};

export { ProductBadges };
