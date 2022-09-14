import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer as TabelCharkraContainer,
} from '@chakra-ui/react';
import { StyledTableContainer } from './styles';
import { Loading } from '@front/loading';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

/* eslint-disable-next-line */
export type TableContainerProps = {
  column: {
    name: string | React.ReactNode;
    props?: { [key: string]: string };
  }[];
  data: { [key: string]: any }[];
  loading?: boolean;
  noDataText?: string;
};

function TableContainer({
  column,
  data = [],
  loading,
  noDataText = '企業の情報がありません',
}: TableContainerProps) {
  return (
    <StyledTableContainer>
      <TabelCharkraContainer>
        <Table variant="simple">
          <Thead height="50px">
            <Tr className="table-header text-bold">
              {column?.map((col, index) => (
                <Th key={index} {...col.props}>
                  {col.name}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody className="table-body">
            {loading ? (
              <Tr className="no-data">
                <Td colSpan={12}>
                  <Loading size="xl" />
                </Td>
              </Tr>
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <Tr key={index} className={row['checked'] ? 'checked' : ''}>
                  {Object.keys(row).map(
                    (item, index) =>
                      item !== 'link' &&
                      item !== 'checked' && <Td key={index}>{row[item]}</Td>
                  )}
                  {row['link'] && (
                    <Link
                      className="row-link"
                      to={row['link']}
                      onClick={() =>
                        scroll.scrollToTop({
                          duration: 0,
                        })
                      }
                    />
                  )}
                </Tr>
              ))
            ) : (
              <Tr className="no-data">
                <Td colSpan={12}>{noDataText}</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TabelCharkraContainer>
    </StyledTableContainer>
  );
}

export default TableContainer;
