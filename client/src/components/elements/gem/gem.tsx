import { FunctionComponent, CSSProperties } from 'react';

import { Colors } from '../../../types/enums/Colors';

type Props = {
  width?: number;
  height?: number;
  color?: Colors;
  className?: string;
};

export const Gem: FunctionComponent<Props> = ({
  width = 24,
  height = 24,
  color = Colors.white,
  className = '',
}) => {
  const customization: CSSProperties = {
    width,
    height,
    color,
  };

  return (
    <svg style={customization} className={className} viewBox={`0 0 24 24`}>
      <path
        fill="currentColor"
        d="M12 2C6.47 2 2 6.5 2 12C2 17.5 6.5 22 12 22S22 17.5 22 12 17.5 2 12 2M12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4S20 7.58 20 12C20 16.42 16.42 20 12 20M8 14L7 8L10 10L12 7L14 10L17 8L16 14H8M8.56 16C8.22 16 8 15.78 8 15.44V15H16V15.44C16 15.78 15.78 16 15.44 16H8.56Z"
      />
    </svg>
  );
};