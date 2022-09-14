import styled, { css } from 'styled-components';
import colors from './colors';

export const navLinkIcon = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ContainerBody = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray.lightSilver};
  border-radius: 5px;
  overflow: hidden;
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
