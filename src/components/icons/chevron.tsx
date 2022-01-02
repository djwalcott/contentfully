import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

type Props = {
  color?: string;
};

export const Chevron: FC<Props> = () => {
  const {
    colors: { gray },
  } = useTheme();
  return (
    <Svg
      fill={gray[400]}
      strokeWidth="1.5px"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={12}
      width={12}
      viewBox="0 0 140 140">
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Path
          d="M19.5,12c0,0.7-0.3,1.3-0.8,1.7L7.5,23.6c-0.8,0.7-2,0.6-2.6-0.2c-0.6-0.8-0.6-1.9,0.2-2.6l9.8-8.6
      c0.1-0.1,0.1-0.2,0-0.4c0,0,0,0,0,0L5.1,3.2C4.3,2.5,4.3,1.3,5,0.6c0.7-0.7,1.8-0.8,2.6-0.2l11.2,9.8C19.2,10.7,19.5,11.3,19.5,12z"
        />
      </G>
    </Svg>
  );
};
