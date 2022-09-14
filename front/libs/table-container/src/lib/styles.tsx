import styled from 'styled-components';

export const StyledTableContainer = styled.div`
  color: #000000;
  font-family: 'Noto Sans JP', sans-serif;

  .table-header {
    background-color: #e6e6e6;
    th {
      font-size: 16px;
      color: #000000;
      font-family: 'Noto Sans JP', sans-serif;
    }
  }

  .table-body {
    tr {
      td {
        border-color: #e6e6e6;
        font-size: 14px;
      }

      &.no-data {
        td {
          text-align: center;
          padding: 0;
          background-color: #fafafa;
        }
        height: 400px;
        font-size: 18px;
      }
      position: relative;

      .row-link {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        display: none;
      }

      &:hover {
        .row-link {
          display: block;
        }
      }

      &.checked {
        background-color: #e6eef6;
      }
    }
  }

  .text-bold {
    font-weight: bold;
  }
`;
