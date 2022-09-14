import styled from 'styled-components';
import { colors } from '../_principles';

export const DivWrap = styled.div`
  height: 96px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  color: ${colors.black};
  font-weight: bold;
  font-size: 21px;
`;
