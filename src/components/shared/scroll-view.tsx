import styled from 'styled-components/native';
import { resolveColor } from '../../utilities/color';

export const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => resolveColor(theme, 'background')};
`;
