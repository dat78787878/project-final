import styled from 'styled-components';
import { ButtonProps } from './button';

export const StyleButton = styled.button<ButtonProps>`
  color: ${(props) => props.color};
  background-color: ${(props) =>
    props.isOutline ? '#FFFFFF' : props.background};
  font-size: ${(props) => props.textSize};
  font-weight: ${(props) => props?.fontWeight || 400};

  width: 100%;
  height: 100%;
  padding: ${(props) => props.paddingLR} ${(props) => props.paddingTB};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  border-radius: 5px;

  border: ${(props) =>
    props.isOutline ? `1px solid ${props.background}` : 'none'};

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: #e5e5e5;
    color: #707070;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;
