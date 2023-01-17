import ContainerHeader from '../../components/ContainerHeader';
import { ContainerBody } from '../../components/_principles/styles';
import {
  Container,
  ContainerFillter,
  ContainerHeaderButton,
  HotelName,
  SelectTopic,
} from './styles';
import TableContainer from '@front/table-container';
import { colors } from '../../components/_principles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@front/button';
import { useLocation } from 'react-router-dom';
import { State } from '../../../types/reducer';
import Select from '@front/select';
import { CSVLink } from 'react-csv';
import { useEffect, useMemo, useState } from 'react';
import { fetchReport } from 'apps/admin/src/redux/admin/action';
import { TableColumn, TableData } from '../../../types/app';

const Report = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { listHotel, loading } = useSelector((state: State) => state.admin);

  const [topicValue, setTopicValue] = useState<string>(
    new URLSearchParams(search).get('topic') || '100'
  );

  const [csv, setCsv] = useState<any>([['firstname', 'lastname', 'email']]);

  const column: TableColumn[] = [
    {
      name: 'STT',
      props: {
        paddingLeft: '24px',
        width: '25%',
      },
    },
    {
      name: 'Hotel Name',
      props: {
        paddingLeft: '24px',
        width: '75%',
      },
    },
  ];

  const tableData: TableData[] = useMemo(() => {
    if (!listHotel) return [];
    return listHotel?.map((comment: any, index: any) => ({
      index: <div>{index + 1}</div>,
      hotelName: <HotelName>{comment}</HotelName>,
    }));
  }, [listHotel]);

  const TOPIC_OPTIONS = [
    { value: 100, name: 'Vui lòng chọn' },
    { value: 0, name: 'vị trí' },
    { value: 1, name: 'spa,bar,bể bơi' },
    { value: 2, name: 'dịch vụ' },
    { value: 3, name: 'phòng,nhà hàng' },
  ];

  useEffect(() => {
    const test: any[] = [];
    test.push(['STT', 'HotelName']);
    listHotel?.map((hotel: any, index: any) => test.push([index, hotel]));
    setCsv(test);
  }, [listHotel]);

  useEffect(() => {
    dispatch(fetchReport(topicValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicValue]);

  return (
    <Container>
      <ContainerHeader
        title=""
        element={
          <ContainerHeaderButton style={{ width: '172px', height: '42px' }}>
            <Button
              background={colors.green.teal}
              color={colors.white}
              textSize="14px"
            >
              <CSVLink data={csv}>Download report</CSVLink>
            </Button>
          </ContainerHeaderButton>
        }
      />
      <ContainerBody>
        <ContainerFillter>
          <SelectTopic>
            <Select
              options={TOPIC_OPTIONS}
              height="40px"
              name="age"
              onChange={(e) => {
                setTopicValue(e.target.value);
              }}
            />
          </SelectTopic>
        </ContainerFillter>
        <TableContainer
          column={column}
          data={tableData}
          loading={loading}
          noDataText="No Data"
        />
      </ContainerBody>
    </Container>
  );
};

export default Report;
