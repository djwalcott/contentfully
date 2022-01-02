import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AnimatedBone } from './bone';

type Props = {
  isLoading: boolean;
  borderRadius: number;
  width: number;
  height: number;
  style?: ViewStyle;
  children: JSX.Element;
};

export const Skeleton: FC<Props> = ({ isLoading, children, ...rest }) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      {isLoading ? <AnimatedBone {...rest} /> : children}
    </Animated.View>
  );
};
