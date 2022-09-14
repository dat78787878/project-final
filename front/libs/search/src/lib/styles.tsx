import styled from 'styled-components';
import { SearchProps } from './search';

export const WrapperSearch = styled.div<SearchProps>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid rgb(215, 215, 215);
  width: ${(props) => props.widthInput};
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

export const SuggestionList = styled.ul<SearchProps>`
  background: #fff;
  border: 1px solid #e6e3e3;
  border-radius: 6px;
  width: ${(props) => props.widthInput};
  overflow: hidden;

  li {
    color: ${(props) => props.color};
    background: #fff;
    list-style: none;
    padding: 7px 0;
    font-size: 14px;
    padding-left: 15px;
    cursor: pointer;
    font-weight: 300;
    &:hover {
      background: rgb(46, 163, 161);
      color: #fff;
    }
  }
`;

export const NoData = styled.div`
  padding: 10px 15px;
  text-align: left;
  font-size: 14px;
`;

type Props = {
  backgroundColor?: string;
};

export const StyleSearch = styled.input<Props>`
  width: 100%;
  margin-left: 8px;
  color: #000000;
  outline: none;
  font-size: 18px;
  background-color: ${(props) => props.backgroundColor};
  ::placeholder {
    font-size: 18px;
    color: #b1b1b1;
  }
  @keyframes identifier {
    from {
      opacity: 0;
    }
  }
`;
