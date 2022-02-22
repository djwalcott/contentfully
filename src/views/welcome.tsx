import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Container } from '../components/shared/container';
import { MainStackParamList } from '../navigation/navigation';
import { addToken, setSelectedToken } from '../storage/reducers/token';
import { useAppDispatch } from '../storage/store';
import { font } from '../styles';

const icon = require('../assets/app-icon.png');

type Context = {
  translateX: number;
  translateY: number;
};

type Props = NativeStackScreenProps<MainStackParamList, 'Welcome'>;

export const Welcome: FC<Props> = ({ navigation }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const dispatch = useAppDispatch();

  const nameRef = useRef<TextInput>(null);
  const contentReft = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: undefined,
      content: undefined,
    },
  });

  const submit = ({ name, content }: { name: string; content: string }) => {
    if (name && content) {
      dispatch(addToken({ name: name, content: content }));
      dispatch(setSelectedToken({ name: name, content: content }));
      reset();
      navigation.navigate('Drawer');
    }
  };

  // const gestureHandler = useAnimatedGestureHandler<
  //   PanGestureHandlerGestureEvent,
  //   Context
  // >({
  //   onStart: (_, ctx) => {
  //     ctx.translateX = translateX.value;
  //     ctx.translateY = translateY.value;
  //   },
  //   onActive: (event, ctx) => {
  //     translateX.value = ctx.translateX + event.translationX;
  //     translateY.value = ctx.translateY + event.translationY;
  //   },
  //   onEnd: _ => {
  //     translateX.value = withSpring(0);
  //     translateY.value = withSpring(0);
  //   },
  // });

  // const animatedStyle = useAnimatedStyle(() => {
  //   'worklet';
  //   return {
  //     transform: [
  //       {
  //         translateX: translateX.value,
  //       },
  //       { translateY: translateY.value },
  //     ],
  //   };
  // });

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Column>
            <PanGestureHandler>
              <IconContainer>
                <Icon source={icon} />
              </IconContainer>
            </PanGestureHandler>
          </Column>
          <Title>Contenfully</Title>
          <Subtitle>Manage Contentful Spaces</Subtitle>

          <InputLabel>Token name</InputLabel>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
              maxLength: 500,
            }}
            render={({
              field: { onChange, onBlur },
              fieldState: { invalid },
            }) => (
              <Input
                ref={nameRef}
                onChangeText={onChange}
                onBlur={onBlur}
                hasErrors={invalid}
                spellCheck={true}
                returnKeyType="next"
                placeholder="ACME Corp Token"
                onSubmitEditing={() => contentReft.current?.focus()}
              />
            )}
          />

          <InputLabel>Token</InputLabel>
          <Controller
            name="content"
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur },
              fieldState: { isTouched, invalid },
            }) => (
              <Input
                ref={contentReft}
                onChangeText={onChange}
                onBlur={onBlur}
                hasErrors={isTouched && invalid}
                textContentType="password"
                returnKeyType="done"
                placeholder="1234Token55678"
              />
            )}
          />

          <HelpText>
            To create a Contenful Management token in Contentful dashboard,
            follow these instructions.
          </HelpText>

          <Button disabled={!isValid} onPress={handleSubmit(submit)}>
            <ButtonText>Authorize</ButtonText>
          </Button>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const ScrollView = styled.ScrollView`
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 32px;
  text-align: center;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-family: ${font.bold};
`;

const Subtitle = styled.Text`
  text-align: center;
  font-size: 15px;
  font-family: ${font.regular};
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: 24px;
`;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Icon = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 14px;
`;

const IconContainer = styled(Animated.View)``;

const Column = styled.View`
  margin: 32px 0px;
  flex-direction: column;
  align-items: center;
  z-index: 20;
`;

const InputLabel = styled.Text`
  font-size: 12px;
  margin-bottom: 4px;
  font-family: 'Inter-Regular';
  color: ${({ theme }) => theme.colors.gray[500]};
`;

type TextInputProps = {
  hasErrors: undefined | boolean;
};

const Input = styled.TextInput<TextInputProps>`
  margin: 4px 0px 16px;
  border-width: 1px;
  border-color: ${({ theme, hasErrors }) =>
    hasErrors ? theme.colors.red[400] : theme.colors.gray[400]};
  padding: 8px;
  font-family: ${font.regular};
  border-radius: 8px;
  font-size: 13px;
`;

const HelpText = styled.Text`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: ${font.regular};
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  margin-bottom: 8px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.indigo[300] : theme.colors.indigo[500]};
  padding: 16px;
  border-radius: 8px;
  margin-top: 32px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  font-family: ${font.medium};
`;
