import styled from 'styled-components';
import { InputSearchProps } from './inputsearch';

export const WrapperSearch = styled.div<InputSearchProps>`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid rgb(215, 215, 215);
  width: 100%;
  max-width: ${(props) => props.widthInput};
  height: ${(props) => props.heightInput};
  border-radius: 5px;
  padding: 4px 15px;
  cursor: text;
  position: relative;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SuggestionList = styled.ul<InputSearchProps>`
  background: #fff;
  border: 1px solid #e6e3e3;
  border-radius: 6px;
  width: 100%;
  overflow: hidden;
  li {
    background: #fff;
    list-style: none;
    padding: 7px 0;
    font-size: 14px;
    padding-left: 15px;
    cursor: pointer;
    font-weight: 300;
    &:hover {
      background: rgb(46, 163, 161);
    }
  }
`;

export const NoData = styled.div`
  padding: 10px 15px;
  text-align: left;
  font-size: 14px;
`;

export const Item = styled.li`
  padding: 8px 16px;
  font-size: 12px;
  &:hover {
    background-color: transparent !important;
    color: #212529 !important;
    cursor: text;
  }
`;

export const ItemSuggestion = styled.li`
  :hover {
    background-color: rgb(46, 163, 161);
    color: rgb(255, 255, 255);
  }
`;

export const StyleSearch = styled.input<InputSearchProps>`
  width: 100%;
  color: #000000;
  outline: none;

  background: ${(props) => props.background};
  padding: ${(props) => props.paddingTB} 0px;
  padding-left: ${(props) => props.paddingL};
  font-size: ${(props) => props.fontSize};
  border: 1px solid
    ${(props) => (props.isError ? '#e74c3c' : 'rgb(215, 215, 215)')};
  ::placeholder {
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.colorPlaceholder};
  }
  @keyframes identifier {
    from {
      opacity: 0;
    }
  }
`;
