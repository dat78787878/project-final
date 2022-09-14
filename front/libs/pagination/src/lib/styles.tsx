import styled from 'styled-components';

export const WapperPagination = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0 0;

  ul {
    display: flex;
    li {
      list-style: none;
      cursor: pointer;
      border: 1px solid rgb(215, 215, 215);
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      box-sizing: border-box;

      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      &:not(:last-child) {
        border-right: none;
      }
      a {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }

    .previous,
    .next {
      width: 30px;
      height: 32px;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &.disabled {
        a {
          cursor: not-allowed;
        }
      }
    }

    .selected {
      background: #2ca3a3;
      color: #fff;
    }
  }
`;
