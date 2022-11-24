import Button from '@front/button';
import TableContainer from '@front/table-container';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TableColumn, TableData } from '../../../types/app';
import ContainerHeader from '../../components/ContainerHeader';
import { ContainerBody } from '../../components/_principles/styles';
import { Plus } from 'react-feather';
import {
  Address,
  ColItems,
  Container,
  ContainerFillter,
  ContainerHeaderButton,
  ContainerSearch,
  CreatingText,
  CreatingWrapper,
  HotelName,
  Img,
} from './styles';
import Search from '@front/search';
import { useDispatch, useSelector } from 'react-redux';
import { createHotel, fetchHotels } from '../../../redux/admin/action';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { State } from '../../../types/reducer';
import useDebounce from '../../../utils/useDebounce';
import Pagination from '@front/pagination';
import dayjs from 'dayjs';
import { generateParams } from '../../../utils/generateParams';
import { animateScroll as scroll } from 'react-scroll';
import { colors } from '../../components/_principles';
import uniq from 'lodash/uniq';
import ProgressBar from './ProgressBar';

const ListCompany = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const dispatch = useDispatch();

  const { hotels, totalPage, loading, createHotelLoadding } = useSelector(
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
        width: '20%',
      },
    },
    {
      name: 'Address',
      props: {
        width: '25%',
      },
    },
    {
      name: 'Image',
      props: {
        width: '25%',
      },
    },
    {
      name: 'Link',
      props: {
        width: '30%',
      },
    },
  ];

  const tableData: TableData[] = useMemo(() => {
    if (!hotels) return [];
    return hotels?.map((hotel: any) => ({
      hotelName: (
        <Link to={`/admin/${hotel.hotel_name}`}>
          <HotelName>{hotel.hotel_name}</HotelName>
        </Link>
      ),
      hotelAddr: <Address>{hotel.hotel_addr}</Address>,
      image: (
        <ColItems>
          <Img src={hotel.hotel_imagelink}></Img>
        </ColItems>
      ),
      hotelOrderLink: <Address>{hotel.hotel_orderlink}</Address>,
      link: ``,
    }));
  }, [hotels]);

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
      fetchHotels(
        page,
        debouncedSearchTerm
          ? {
              search: debouncedSearchTerm,
            }
          : {}
      )
    );
  };

  const handleCreateHotels = () => {
    dispatch(createHotel());
  };

  // search
  useEffect(() => {
    dispatch(
      fetchHotels(
        currentPage,
        debouncedSearchTerm
          ? {
              search: debouncedSearchTerm,
            }
          : {}
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  // set suggestions
  useEffect(() => {
    if (hotels?.length > 0) {
      setSuggestions(() => {
        const list = hotels.reduce(
          (acc: any, cur: any) => [...acc, cur.hotel_name, cur.hotel_addr],
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
  }, [hotels]);

  useEffect(() => {
    if (!search) {
      setCurrentPage(1);
      if (searchValue) {
        setSearchValue('');
      } else {
        dispatch(fetchHotels(1, {}));
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

  const [completed, setCompleted] = useState(5);

  useEffect(() => {
    let timer: any = null;
    if (createHotelLoadding) {
      timer = setInterval(
        () =>
          setCompleted((prev) => {
            let number = prev;
            if (prev <= 94) {
              number = prev + Math.floor(Math.random() * 5) + 1;
            }
            return number;
          }),
        2000
      );
    }

    if (completed > 98) {
      clearInterval(timer);
    }

    if (completed > 98 && !createHotelLoadding) {
      setCompleted(100);
      clearInterval(timer);
    }

    return () => timer && clearInterval(timer);
  }, [createHotelLoadding, completed]);

  return (
    <Container>
      <ContainerHeader
        title=""
        element={
          <ContainerHeaderButton style={{ width: '172px', height: '42px' }}>
            <Button
              onClick={handleCreateHotels}
              background={colors.green.teal}
              color={colors.white}
              textSize="14px"
            >
              Crawl Data
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
      {createHotelLoadding && (
        <CreatingWrapper>
          <CreatingText>
            <ProgressBar bgcolor={colors.green.teal} completed={completed} />
            Loadinggg.......!
          </CreatingText>
        </CreatingWrapper>
      )}
    </Container>
  );
};

export default ListCompany;
