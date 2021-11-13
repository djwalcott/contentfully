import React, { FC } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { Container } from '../components/shared/container';
import { Toggle } from '../components/toggle/toggle';
import { CardDescription, CardTitle } from '../components/typography';
import { addToken, setSelectedToken, Token } from '../storage/reducers/token';
import { useAppDispatch, useAppSelector } from '../storage/store';

export const Settings: FC = () => {
  const { tokens, selected } = useAppSelector(state => state.tokens);
  const dispatch = useAppDispatch();

  const addNewToken = () => {
    dispatch(
      addToken({
        name: 'Salainen tiedekunta',
        content: '',
      }),
    );
  };

  const selectToken = (token: Token) => {
    dispatch(setSelectedToken(token));
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
          <TokenItem key={token.name} onPress={() => selectToken(token)}>
            <Toggle selected={selected?.name === token.name} />
            <Column>
              <Name>{token.name}</Name>
              <TokenContent
                editable={false}
                secureTextEntry
                value="Nothing to show here"
              />
            </Column>
          </TokenItem>
        ))}

        <CardTitle>Add new Token</CardTitle>

        <InputLabel>Token name</InputLabel>
        <Input
          spellCheck={true}
          returnKeyType="next"
          placeholder="ACME Corp Token"
        />

        <InputLabel>Token</InputLabel>
        <Input
          textContentType="password"
          returnKeyType="done"
          placeholder="1234Token55678"
        />

        <Button title="Add token" onPress={addNewToken} />
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

const InputLabel = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const TokenItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const TokenContent = styled.TextInput`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 13px;
`;

const Input = styled.TextInput`
  margin: 4px 0px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[400]};
  padding: 8px;
  border-radius: 8px;
  font-size: 13px;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-weight: 500;
  font-size: 13px;
`;

const Column = styled.View``;
