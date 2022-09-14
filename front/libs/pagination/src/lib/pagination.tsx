import ReactPaginate from 'react-paginate';
import { WapperPagination } from './styles';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useCallback } from 'react';

type Props = {
  totalPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

function Pagination({
  totalPage,
  setCurrentPage,
  currentPage,
  ...props
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePage = useCallback(
    (event: any) => {
      setCurrentPage(event.selected + 1);
    },
    [setCurrentPage]
  );

  return (
    <WapperPagination>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRight />}
        onPageChange={(e: any) => handlePage(e)}
        pageRangeDisplayed={3}
        pageCount={totalPage}
        previousLabel={<ChevronLeft />}
        forcePage={currentPage - 1}
        {...props}
      />
    </WapperPagination>
  );
}

export default Pagination;
