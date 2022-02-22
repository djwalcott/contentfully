import React, { FC } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {
  SkeletonComponent: () => React.ReactElement;
  isLoading: boolean;
  items: number;
  content: JSX.Element;
};

/* Use only for simple list */
export const SkeletonList: FC<Props> = ({
  SkeletonComponent,
  items,
  isLoading,
  content,
}) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      {isLoading
        ? [...Array(items).keys()].map(index => (
            <SkeletonComponent key={index} />
          ))
        : content}
    </Animated.View>
  );
};
