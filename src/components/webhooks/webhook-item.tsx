import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useDeleteWebhook, Webhook } from '../../hooks/webhooks';
import { formatTimestamp } from '../../utilities/time';
import { SpaceScreenProps } from '../../views/space';
import { Chevron } from '../icons/chevron';
import { DeleteIcon } from '../icons/delete';
import { Description, ItemContainer, Title } from '../item/item';

const WIDTH = Dimensions.get('window').width - 16;
const BUTTON_WIDTH = 80;
const MAX_TRANSLATE = -BUTTON_WIDTH;

const springConfig = (velocity: number) => {
  'worklet';

  return {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    velocity,
  };
};

const timingConfig = {
  duration: 400,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

type Props = {
  hook: Webhook;
  removeHook: (id: string) => void;
};

export const WebhookItem: FC<Props> = ({ hook, removeHook }) => {
  const navigation = useNavigation<SpaceScreenProps['navigation']>();

  const isRemoving = useSharedValue(false);
  const translateX = useSharedValue(0);

  const deleteHook = () => {
    removeHook(hook.sys.id);
  };

  type AnimatedGHContext = {
    startX: number;
  };
  const handler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_evt, ctx) => {
      ctx.startX = translateX.value;
    },

    onActive: (evt, ctx) => {
      const nextTranslate = evt.translationX + ctx.startX;
      translateX.value = Math.min(0, Math.max(nextTranslate, MAX_TRANSLATE));
    },

    onEnd: evt => {
      if (evt.velocityX < -20) {
        translateX.value = withSpring(
          MAX_TRANSLATE,
          springConfig(evt.velocityX),
        );
      } else {
        translateX.value = withSpring(0, springConfig(evt.velocityX));
      }
    },
  });

  const styles = useAnimatedStyle(() => {
    if (isRemoving.value) {
      return {
        height: withTiming(0, timingConfig, () => {
          runOnJS(deleteHook)();
        }),
        transform: [
          {
            translateX: withTiming(-WIDTH, timingConfig),
          },
        ],
      };
    }

    return {
      height: 45,
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const handleDelete = () => [(isRemoving.value = true)];

  return (
    <PanGestureHandler activeOffsetX={[-10, 10]} onGestureEvent={handler}>
      <Animated.View style={styles}>
        <ItemContainer
          onPress={() =>
            navigation.navigate('Webhook', {
              webhookID: hook.sys.id,
              title: hook.name,
            })
          }>
          <Column>
            <Title>{`${hook.name}`}</Title>
            <Description>{formatTimestamp(hook?.sys.updatedAt)}</Description>
          </Column>
          <Chevron />
        </ItemContainer>
        <ButtonsContainer>
          <ButtonContainer>
            <DeleteButton onPress={handleDelete}>
              <DeleteIcon color={'white'} />
            </DeleteButton>
          </ButtonContainer>
        </ButtonsContainer>
      </Animated.View>
    </PanGestureHandler>
  );
};

const Column = styled.View`
  flex: 1;
  padding-bottom: 8px;
`;

const ButtonContainer = styled.View`
  width: ${WIDTH}px;
  padding-right: ${WIDTH - BUTTON_WIDTH}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.red[500]};
`;

const DeleteButton = styled.TouchableOpacity`
  width: ${BUTTON_WIDTH}px;
  justify-content: center;
  align-items: center;
`;

const ButtonsContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${WIDTH}px;
  width: ${WIDTH}px;
`;
