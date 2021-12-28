import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Container } from '../components/shared/container';
import { CardTitle } from '../components/shared/typography';
import { useContentfulUser } from '../hooks/user';

type Props = {};

export const User: FC<Props> = () => {
  const { data } = useContentfulUser();
  return (
    <ScrollView>
      <Container>
        <CardTitle>
          {data?.firstName} {data?.lastName}
        </CardTitle>
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;
