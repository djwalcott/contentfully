import React, { FC } from 'react';
import Svg, { G, Line, Path, Rect } from 'react-native-svg';

type Props = {
  fieldType: string;
};

export const FieldIcon: FC<Props> = ({ fieldType }) => {
  switch (fieldType) {
    case 'Symbol':
      return <Symbol color="black" />;
    case 'Link':
      return <Link color="black" />;
    case 'Array':
      return <Array color="black" />;
    default:
      return <Link color="black" />;
  }
};

type IconProps = {
  color: string;
};

export const Link: FC<IconProps> = ({ color }) => {
  return (
    <Svg
      viewBox="0 0 140 140"
      fill="none"
      strokeWidth="1.5px"
      stroke={color}
      height={16}
      width={16}>
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Path d="M9.364,18.5l-.932.932a4.5,4.5,0,0,1-6.364-6.364L6.841,8.294a4.5,4.5,0,0,1,6.825,5.825" />
        <Path d="M14.818,5.567l.75-.75a4.5,4.5,0,0,1,6.364,6.364l-4.773,4.773a4.5,4.5,0,0,1-6.824-5.826" />
      </G>
    </Svg>
  );
};

export const Symbol: FC<IconProps> = ({ color }) => {
  return (
    <Svg
      viewBox="0 0 140 140"
      fill="none"
      strokeWidth="1.5px"
      stroke={color}
      height={16}
      width={16}>
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Rect x="0.75" y="6.748" width="22.5" height="10.5" rx="1.5" ry="1.5" />
        <Line x1="3.75" y1="9.748" x2="3.75" y2="14.248" />
      </G>
    </Svg>
  );
};

export const Array: FC<IconProps> = ({ color }) => {
  return (
    <Svg
      viewBox="0 0 140 140"
      fill="none"
      strokeWidth="1.5px"
      stroke={color}
      height={16}
      width={16}>
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Rect
          x="9.75"
          y="18.748"
          width="13.5"
          height="4.5"
          rx="0.75"
          ry="0.75"
        />
        <Rect
          x="9.75"
          y="11.248"
          width="13.5"
          height="4.5"
          rx="0.75"
          ry="0.75"
        />
        <Rect
          x="0.75"
          y="0.748"
          width="13.5"
          height="4.5"
          rx="0.75"
          ry="0.75"
        />
        <Path d="M6.75,5.248v1.5a1.5,1.5,0,0,0,1.5,1.5h4.5a1.5,1.5,0,0,1,1.5,1.5v1.5" />
        <Line x1="17.25" y1="15.748" x2="17.25" y2="18.748" />
      </G>
    </Svg>
  );
};
