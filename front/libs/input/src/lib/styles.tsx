import styled from 'styled-components';
import { InputProps } from './input';

export const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: ${(props) => props.height};
  padding: ${(props) => props.paddingTB} 0px;
  padding-left: ${(props) => props.paddingLR};

  background: ${(props) => props.background};

  border-radius: 5px;
  border: 1px solid
    ${(props) => (props.isError ? '#e74c3c' : 'rgb(215, 215, 215)')};
  outline: none;
  font-size: ${(props) => props.fontSize};
  ::placeholder {
    color: ${(props) => props.colorPlaceholder};
    font-size: ${(props) => props.fontSize};
  }
`;
