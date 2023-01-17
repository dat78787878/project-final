import styled from 'styled-components';
import { OptionProps, ObjSelectProps } from './select';

type Props = {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  size?: string;
  options?: ObjSelectProps[];
  height?: string;
  disabledSelected?: any;
  isError?: boolean;
  borderColor?: string;
};

export const StyledSelect = styled.div<Props>`
  border-radius: 5px;
  width: 100%;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) => props.height};

  option[value=''][disabled] {
    display: none;
  }

  .chakra-select__wrapper {
    border-radius: 5px;
  }

  .chakra-select {
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid
      ${(props) => (props.isError ? '#e74c3c' : 'rgb(215, 215, 215)')} !important;
    font-size: ${(props) => props.fontSize};
    height: ${(props) => props.height};
    color: ${(props) => props.color};
    background-color: ${(props) => props.backgroundColor} !important;
  }

  .chakra-select__wrapper {
    color: ${(props) => props.color};
    background-color: ${(props) => props.backgroundColor} !important;
  }

  .chakra-select:active {
    option {
      border-radius: 5px;
      border: 1px solid #e74c3c;
      font-size: ${(props) => props.fontSize};
    }
  }

  .chakra-select:focus-visible {
    border-color: #d7d7d7 !important;
  }

  .chakra-select__icon-wrapper {
    color: black;
  }
`;

export const OptionDisabledSelected = styled.option``;

export const Option = styled.option<OptionProps>``;
