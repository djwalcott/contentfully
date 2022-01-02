import styled, { css } from 'styled-components/native';
import { font } from '../../styles';

type ListButtonProps = {
  noBorder?: boolean;
};

export const ListButton = styled.TouchableOpacity<ListButtonProps>`
  padding: 20px 16px;

  ${({ noBorder }) =>
    !noBorder &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
    `}
`;

export const ListButtonText = styled.Text`
  font-size: 15px;
  font-family: ${font.medium};
  color: ${({ theme }) => theme.colors[theme.accent][500]};
`;
