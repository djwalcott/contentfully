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
  focused?: boolean;
  color: string;
  size?: number;
};

export const Block: FC<Props> = ({ color }) => {
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

export const NavigationMenu: FC<Props> = ({ color }) => {
  return (
    <Svg
      fill="red"
      strokeWidth="1.5px"
      stroke="none"
      height={20}
      width={20}
      viewBox="0 0 140 140">
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Path d="M23.5,6.5a1,1,0,0,1-1,1H7.5a1,1,0,0,1-1-1v-1a1,1,0,0,1,1-1h15a1,1,0,0,1,1,1Z" />
        <Path d="M20.5,12.5a1,1,0,0,1-1,1H4.5a1,1,0,0,1-1-1v-1a1,1,0,0,1,1-1h15a1,1,0,0,1,1,1Z" />
        <Path d="M17.5,18.5a1,1,0,0,1-1,1H1.5a1,1,0,0,1-1-1v-1a1,1,0,0,1,1-1h15a1,1,0,0,1,1,1Z" />
      </G>
    </Svg>
  );
};

export const Home: FC<Props> = ({ color }) => {
  return (
    <Svg
      fill="none"
      strokeWidth="1.5px"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
      height={20}
      width={20}
      viewBox="0 0 140 140">
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Path
          d="M2.96,9,6.34,22.288A1.226,1.226,0,0,0,7.5,23.25h9a1.225,1.225,0,0,0,1.156-.962L21.033,9"
          fill="none"
        />
        <Path d="M0.747 11.021L11.997 0.75 23.247 11.021" fill="none" />
        <Path
          d="M8.997 14.250 A3.000 3.000 0 1 0 14.997 14.250 A3.000 3.000 0 1 0 8.997 14.250 Z"
          fill="none"
        />
      </G>
    </Svg>
  );
};

export const Content: FC<Props> = ({ color }) => {
  return (
    <Svg
      fill="none"
      strokeWidth="1.5px"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
      height={20}
      width={20}
      viewBox="0 0 140 140">
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Path d="M18.746 2.25h-16.5a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h18a1.5 1.5 0 0 0 1.5-1.5v-9m-21-4.5h12.75" />
        <Path d="m22.782 6.465-5.723 5.723-2.813.562.563-2.812 5.723-5.723a1.585 1.585 0 0 1 2.243 0l.007.006a1.588 1.588 0 0 1 0 2.244zM5.246 12.75h4.5m-4.5 4.5h9.75" />
      </G>
    </Svg>
  );
};

export const Media: FC<Props> = ({ color }) => {
  return (
    <Svg
      fill="none"
      strokeWidth="1.5px"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
      height={20}
      width={20}
      viewBox="0 0 140 140">
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Path d="M22,4.5H9a1,1,0,0,1-.72-.306L6.938,2.806a1,1,0,0,0-.72-.306H2.786A1.286,1.286,0,0,0,1.5,3.786V15.5" />
        <Rect x="4.5" y="7.5" width="18" height="14" rx="1" ry="1" />
        <Path d="M8,18.5l2.45-3.151a1,1,0,0,1,1.274-.206L13.5,16.5l1.663-2.14a1,1,0,0,1,1.587.067L19.5,18.5Z" />
        <Circle cx="9.5" cy="11" r="1.5" />
      </G>
    </Svg>
  );
};
