import React, { FC } from 'react';
import styled from 'styled-components/native';
import { font } from '../../styles';

type Props = {
  fieldKey: string;
};

export const FieldItem: FC<Props> = ({ fieldKey }) => {
  return (
    <Container>
      <FieldTitle>{fieldKey}</FieldTitle>
      <FieldContent>
        {/* {locale?.code && fieldResolver(entry?.fields[fieldKey][locale?.code])} */}
      </FieldContent>
    </Container>
  );
};

const Container = styled.View``;

const FieldTitle = styled.Text`
  margin: 8px 0px 4px;
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${font.medium};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const FieldContent = styled.Text``;
