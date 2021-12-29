import React, { FC, useEffect } from 'react';
import { ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

type Props = {
  borderRadius: number;
  width: number;
  height: number;
  style?: ViewStyle;
};

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

export const AnimatedBone: FC<Props> = ({
  borderRadius,
  height,
  width,
  style,
}) => {
  const animationValue = useSharedValue(0);

  useEffect(() => {
    animationValue.value = withRepeat(
      withTiming(1, {
        duration: 1100,
        easing: Easing.elastic(1.5),
      }),
      -1,
      false,
    );
  });

  const animatedStyles = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          translateX: interpolate(
            animationValue.value,
            [0, 1],
            [-width, width],
          ),
        },
      ],
    };
  });

  return (
    <Bone style={[{ height, width, borderRadius }, style]}>
      <AnimatedLinearGradient
        style={animatedStyles}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </Bone>
  );
};

const Bone = styled.View`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const AnimatedLinearGradient = styled(AnimatedLG).attrs(({ theme }) => ({
  colors: [
    theme.colors.gray[200],
    theme.colors.gray[50],
    theme.colors.gray[200],
  ],
}))`
  height: 100%;
  width: 100%;
`;
