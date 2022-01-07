import React, { FC } from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Line,
  Path,
  Polygon,
  Rect,
} from 'react-native-svg';

type Props = {
  color: string;
};

export const DeleteIcon: FC<Props> = ({ color }) => {
  return (
    <Svg
      fill="none"
      strokeWidth="1.5px"
      stroke={color}
      height={20}
      width={20}
      viewBox="0 0 140 140">
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Polygon points="22.5 7.5 22.5 18 12 22.5 1.5 18 1.5 7.5 12 12 22.5 7.5" />
        <Line x1="12" y1="22.5" x2="12" y2="12" />
        <Line x1="7.5" y1="4.929" x2="1.5" y2="7.5" />
        <Line x1="16.5" y1="4.929" x2="22.5" y2="7.5" />
        <Ellipse cx="12" cy="3" rx="4.5" ry="1.5" />
        <Path d="M7.5,3V6c0,.828,2.015,1.5,4.5,1.5s4.5-.672,4.5-1.5V3" />
      </G>
    </Svg>
  );
};
