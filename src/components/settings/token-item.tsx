import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { setSelectedToken, Token } from '../../storage/reducers/token';
import { Toggle } from '../toggle/toggle';

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

type Props = {
  token: Token;
  selected: boolean;
  onDismiss: (token: Token) => void;
  simultaneousHandlers: Pick<PanGestureHandlerProps, 'simultaneousHandlers'>;
};

export const TokenItem: FC<Props> = ({
  token,
  selected,
  onDismiss,
  simultaneousHandlers,
}) => {
  const dispatch = useDispatch();

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const selectToken = () => {
    dispatch(setSelectedToken(token));
  };

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(token);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <OuterContainer>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}>
        <Container
          style={[rStyle]}
          key={token.name}
          //  onPress={selectToken}
        >
          <Toggle selected={selected} />
          <Column>
            <Name>{token.name}</Name>
            <TokenContent
              editable={false}
              secureTextEntry
              value="Nothing to show here"
            />
          </Column>
        </Container>
      </PanGestureHandler>
    </OuterContainer>
  );
};

const Container = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const TokenContent = styled.TextInput`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 13px;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-weight: 500;
  font-size: 13px;
`;

const Column = styled.View``;

const OuterContainer = styled.View``;
