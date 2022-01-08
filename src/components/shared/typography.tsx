import styled from 'styled-components/native';
import { font } from '../../styles';
import { resolveColor } from '../../utilities/color';

export const CardTitle = styled.Text`
  color: ${({ theme }) => resolveColor(theme, 'text')};
  font-family: ${font.medium};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
`;

export const FloatingTitle = styled.Text`
  color: ${({ theme }) => resolveColor(theme, 'text')};
  font-family: ${font.medium};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.3px;
  margin: 0px 16px 8px;
`;

export const CardDescription = styled.Text`
  color: ${({ theme }) => resolveColor(theme, 'text')};
  font-size: 12px;
  font-family: ${font.regular};
  margin-bottom: 8px;
`;
