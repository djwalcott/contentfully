import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Color, setAccentColor } from '../../storage/reducers/theme';
import { useAppDispatch, useAppSelector } from '../../storage/store';
import { ThemePreview } from './theme-preview';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CardTitle } from '../shared/typography';

const colors: Color[] = ['stone', 'emerald', 'indigo', 'fuchsia', 'red'];

export const ThemePicker: FC = () => {
  const [width, setWidth] = useState(0);
  const dispatch = useAppDispatch();
  const { accentColor } = useAppSelector(({ theme }) => theme);

  const left = useSharedValue(
    colors.findIndex(color => color === accentColor) * (width / colors.length),
  );

  useEffect(() => {
    left.value = colors.findIndex(color => color === accentColor) * (width / 4);
  }, [accentColor, left, width]);

  const animatedStyles = useAnimatedStyle(() => {
    'worklet';
    return {
      left: withTiming(left.value),
    };
  });

  const selectColor = (color: Color) => {
    dispatch(setAccentColor(color));
  };

  return (
    <Container>
      <ThemePreview />
      <CardTitle>Accent color</CardTitle>
      <ColorOptions
        onLayout={event => {
          const { width: containerWidth } = event.nativeEvent.layout;
          setWidth(containerWidth + 20);
        }}>
        <CircleContainer style={animatedStyles} />
        {colors.map(color => (
          <ColorCircle
            key={color}
            onPress={() => selectColor(color)}
            color={color}>
            <InnerCircle />
          </ColorCircle>
        ))}
      </ColorOptions>

      <CardTitle>Background color</CardTitle>

      <CardTitle>Text color</CardTitle>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 16px;
`;

const ColorOptions = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

type CircleProps = {
  color: string;
};

const CircleContainer = styled(Animated.View)`
  border-width: 2px;
  background-color: ${({ theme }) => theme.colors.gray[100]}
  border-color: ${({ theme }) => theme.colors.gray[300]}
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  width: 32px;
  height: 32px;
  position:absolute;    

  transform: translate(-4px, 0px);
`;

const ColorCircle = styled.TouchableOpacity<CircleProps>`
  background-color: ${({ color, theme }) => theme.colors[color as Color][500]};
  height: 24px;
  width: 24px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.View`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  height: 16px;
  width: 16px;
  border-radius: 15px;
`;
