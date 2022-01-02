import React, { FC, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Block, Content, Home, Media as MediaIcon } from '../icons/icons';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
  route: {
    name: string;
  };
};

export const TabBarIcon: FC<TabBarIconProps> = ({
  focused,
  color,
  size,
  route,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    focused ? (scale.value = 1.1) : (scale.value = 0.9);
  }, [focused, scale]);

  const animatedStyles = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          scale: withSpring(scale.value, {
            damping: 8,
            stiffness: 200,
            restSpeedThreshold: 0.01,
          }),
        },
      ],
    };
  });

  const icon = () => {
    switch (route.name) {
      case 'Home':
        return <Home color={color} size={size} focused={focused} />;
      case 'Content model':
        return <Block color={color} size={size} focused={focused} />;
      case 'Content':
        return <Content color={color} size={size} focused={focused} />;
      case 'Media':
        return <MediaIcon color={color} size={size} focused={focused} />;
      default:
        return <Home color={color} size={size} focused={focused} />;
    }
  };

  return <Animated.View style={animatedStyles}>{icon()}</Animated.View>;
};
