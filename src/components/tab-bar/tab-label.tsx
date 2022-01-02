import React, { FC, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { font } from '../../styles';

type Props = {
  focused: boolean;
  tabBarLabel: string;
  color: string;
};

export const TabBarLabel: FC<Props> = ({ focused, tabBarLabel, color }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    focused ? (scale.value = 1) : (scale.value = 2);
  }, [focused, scale]);

  const animatedStyles = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          translateY: withSpring(scale.value, {
            damping: 8,
            stiffness: 200,
            restSpeedThreshold: 0.01,
          }),
        },
      ],
    };
  });

  return (
    <Label color={color} style={animatedStyles}>
      {tabBarLabel}
    </Label>
  );
};

type LabelProps = {
  color: string;
};

const Label = styled(Animated.Text)<LabelProps>`
  margin-top: 4px;
  font-size: 11px;
  font-family: ${font.medium};
  color: ${({ color }) => color};
`;
