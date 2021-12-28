import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { font } from '../../styles';

type Props = {
  buttonText: string;
} & TouchableOpacityProps;

export const PrimaryButton: FC<Props> = ({ buttonText, ...props }) => {
  return (
    <Button {...props}>
      <ButtonText>{buttonText}</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  background-color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors[theme.accent][300]
      : theme.colors[theme.accent][500]};
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
