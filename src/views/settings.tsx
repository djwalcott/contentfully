import React, { FC, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components/native';
import { TokenItem } from '../components/settings/token-item';
import { PrimaryButton } from '../components/shared/button';
import { Container } from '../components/shared/container';
import { CardDescription, CardTitle } from '../components/shared/typography';
import { ThemePicker } from '../components/theme-picker/theme-picker';
import { addToken } from '../storage/reducers/token';
import { useAppDispatch, useAppSelector } from '../storage/store';

export const Settings: FC = () => {
  const { tokens, selected } = useAppSelector(state => state.tokens);
  const dispatch = useAppDispatch();
  const scrollRef = useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      content: '',
    },
  });

  const submit = ({ name, content }: { name: string; content: string }) => {
    reset();
    dispatch(
      addToken({
        name: name,
        content: content,
      }),
    );
  };

  return (
    <ScrollView>
      <Container>
        <CardTitle>Management tokens</CardTitle>
        <CardDescription>
          To create a Contenful Management token in Contentful dashboard, follow
          these instructions.
        </CardDescription>
        {tokens?.map(token => (
          <TokenItem
            simultaneousHandlers={scrollRef}
            key={token.name}
            selected={selected?.name === token.name}
            token={token}
          />
        ))}

        <CardTitle>Add new Token</CardTitle>
        <InputLabel>Token name</InputLabel>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              spellCheck={true}
              returnKeyType="next"
              placeholder="ACME Corp Token"
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              textContentType="password"
              returnKeyType="done"
              placeholder="1234Token55678"
            />
          )}
        />

        <PrimaryButton
          disabled={!isValid}
          buttonText="Add Token"
          onPress={handleSubmit(submit)}
        />
      </Container>

      <Container>
        <CardTitle>Theme</CardTitle>

        <ThemePicker />
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

const InputLabel = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const Input = styled.TextInput`
  margin: 4px 0px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[400]};
  padding: 8px;
  border-radius: 8px;
  font-size: 13px;
`;
