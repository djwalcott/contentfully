import React, {FC} from 'react';
import styled from 'styled-components/native';

type Props = {
  name: string;
  id: string;
};

export const DrawerSpace: FC<Props> = ({name, id}) => {
  return (
    <Container>
      <Space>{name}</Space>
      <SpaceID>{id}</SpaceID>
    </Container>
  );
};

const Container = styled.View``;

const Space = styled.Text``;
const SpaceID = styled.Text``;
