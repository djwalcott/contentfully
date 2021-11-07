import React, { FC, useEffect } from 'react';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  selected: boolean;
};

export const Toggle: FC<Props> = ({ selected }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    selected ? (scale.value = 1) : (scale.value = 0);
  }, [selected, scale]);

  const animatedStyles = useAnimatedStyle(() => {
    'worklet';
    return {
      scale: withSpring(scale.value),
    };
  });

  return (
    <Container onPress={() => (scale.value = Math.random())}>
      <Circle style={animatedStyles} />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.gray[700]};
  margin-right: 8px;
`;

const Circle = styled(Animated.View)`
  height: 10px;
  width: 10px;
  border-radius: 20px;
  background-color: red;
`;
