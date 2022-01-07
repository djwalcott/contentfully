import styled from 'styled-components/native';
import { font } from '../../styles';

type ItemContainerProps = {};

export const ItemContainer = styled.TouchableOpacity<ItemContainerProps>`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 13px;
  font-family: ${font.regular};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

export const Description = styled.Text`
  font-size: 12px;
  font-family: ${font.regular};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

type Props = {
  onPress: () => void;
  onDelete: () => void;
};

export const ListItem = () => {
  return <Container></Container>;
};

const Container = styled.View``;
