import Button from '@front/button';
import TableContainer from '@front/table-container';
import { useEffect, useMemo, useState } from 'react';
import { TableColumn, TableData } from '../../../types/app';
import ContainerHeader from '../../components/ContainerHeader';
import { ContainerBody } from '../../components/_principles/styles';
import {
  Address,
  Container,
  ContainerFillter,
  ContainerHeaderButton,
  ContainerSearch,
  HotelName,
} from './styles';
import Search from '@front/search';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAnalys,
  createHotel,
  fetchComment,
} from '../../../redux/admin/action';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { State } from '../../../types/reducer';
import useDebounce from '../../../utils/useDebounce';
import Pagination from '@front/pagination';
import dayjs from 'dayjs';
import { generateParams } from '../../../utils/generateParams';
import { animateScroll as scroll } from 'react-scroll';
import { colors } from '../../components/_principles';
import uniq from 'lodash/uniq';

const ListComment = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const dispatch = useDispatch();

  const { comments, totalPage, loading } = useSelector(
    (state: State) => state.admin
  );

  const [currentPage, setCurrentPage] = useState<number>(
    Number(new URLSearchParams(search).get('page')) || 1
  );
  const [searchValue, setSearchValue] = useState<string>(
    new URLSearchParams(search).get('search') || ''
  );
  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const column: TableColumn[] = [
    {
      name: 'Hotel Name',
      props: {
        paddingLeft: '24px',
        width: '15%',
      },
    },
    {
      name: 'User',
      props: {
        width: '10%',
      },
    },
    {
      name: 'Comment',
      props: {
        width: '20%',
      },
    },
    {
      name: 'Time',
      props: {
        width: '10%',
      },
    },
    {
      name: 'IdTopic',
      props: {
        width: '10%',
      },
    },
    {
      name: 'Topic',
      props: {
        width: '25%',
      },
    },
    {
      name: 'Sentiment',
      props: {
        width: '15%',
      },
    },
  ];

  const tableData: TableData[] = useMemo(() => {
    if (!comments) return [];
    return comments?.map((comment: any) => ({
      hotelName: <HotelName>{comment.hotel_name}</HotelName>,
      userName: <Address>{comment.user_name}</Address>,
      commentDetail: (
        <Address title={comment.comment_detail}>
          {comment.comment_detail}
        </Address>
      ),

      timeComment: <Address>{comment.time_comment}</Address>,
      topicID: <Address>{comment.topic_id}</Address>,
      topicContent: <Address>{comment.topic_content}</Address>,
      sentimentCheck: <Address>{comment.sentiment_check}</Address>,
      link: ``,
    }));
  }, [comments]);

  const handleChangeSearch = (value: string) => {
    setSearchValue(value);
    navigate(
      generateParams(pathname, {
        page: 1,
        search: value,
      }),
      { replace: true }
    );
    setCurrentPage(1);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    scroll.scrollToTop({ delay: 0, duration: 0 });
    navigate(
      generateParams(pathname, {
        page: page,
        search: debouncedSearchTerm,
      }),
      { replace: true }
    );

    dispatch(
      fetchComment(
        page,
        debouncedSearchTerm
          ? {
              company_name_or_email_i_cont_any: debouncedSearchTerm,
            }
          : {}
      )
    );
  };
  const handleAnalys = () => {
    dispatch(createAnalys());
  };
  // search
  useEffect(() => {
    dispatch(
      fetchComment(
        currentPage,
        debouncedSearchTerm
          ? {
              company_name_or_email_i_cont_any: debouncedSearchTerm,
            }
          : {}
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  // set suggestions
  useEffect(() => {
    if (comments?.length > 0) {
      setSuggestions(() => {
        const list = comments.reduce(
          (acc: any, cur: any) => [...acc, cur.hotel_name, cur.user_name],
          []
        );
        return uniq(
          list.filter((item: any) => {
            if (item.includes(searchValue.trim())) {
              return item;
            }
          })
        );
      });
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  useEffect(() => {
    if (!search) {
      setCurrentPage(1);
      if (searchValue) {
        setSearchValue('');
      } else {
        dispatch(fetchComment(1, {}));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (!search) {
      setCurrentPage(1);
      setSearchValue('');
    }
  }, [search]);
  return (
    <Container>
      <ContainerHeader
        title=""
        element={
          <ContainerHeaderButton style={{ width: '172px', height: '42px' }}>
            <Button
              onClick={handleAnalys}
              background={colors.green.teal}
              color={colors.white}
              textSize="14px"
            >
              Analysis
            </Button>
          </ContainerHeaderButton>
        }
      />
      <ContainerBody>
        <ContainerFillter>
          <ContainerSearch>
            <Search
              widthInput="452px"
              value={searchValue}
              onChange={handleChangeSearch}
              data={suggestions}
              loading={loading}
            />
          </ContainerSearch>
        </ContainerFillter>
        <TableContainer
          column={column}
          data={tableData}
          loading={loading}
          noDataText="No Data"
        />
      </ContainerBody>
      {totalPage !== 0 && (
        <Pagination
          totalPage={totalPage}
          setCurrentPage={handleChangePage}
          currentPage={currentPage}
        />
      )}
    </Container>
  );
};

export default ListComment;
