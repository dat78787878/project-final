import Button from '@front/button';
import { useEffect } from 'react';

import ContainerHeader from '../../components/ContainerHeader';
import { ContainerBody } from '../../components/_principles/styles';
import {
  Address,
  Avatar,
  Comment,
  Container,
  ContentComment,
  DetailComment,
  Img,
  Infor,
  LinkHotel,
  ListComment,
  Title,
  UserName,
  WrapperDetail,
} from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotelDetail } from '../../../redux/admin/action';
import { useNavigate, useParams } from 'react-router-dom';

import { animateScroll as scroll } from 'react-scroll';
import { colors } from '../../components/_principles';
import { State } from 'apps/admin/src/types/reducer';
import { Loading } from '@front/loading';

const DetailHotel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { detailHotel, loading } = useSelector((state: State) => state.admin);

  useEffect(() => {
    if (id) {
      dispatch(fetchHotelDetail(id));
    }
    scroll.scrollToTop({ delay: 0, duration: 0 });
  }, []);

  console.log('detailHotel', detailHotel);
  return (
    <Container>
      {id && <ContainerHeader title={id} />}
      {loading ? (
        <Loading />
      ) : (
        <ContainerBody>
          <WrapperDetail>
            <Infor>
              <Address>{detailHotel?.hotel_addr}</Address>
              <LinkHotel>{detailHotel?.hotel_orderlink}</LinkHotel>
              <Img src={detailHotel?.hotel_imagelink}></Img>
            </Infor>
            <Title>Comment</Title>
            <ListComment>
              {detailHotel?.list_comment?.map((item: any) => (
                <Comment>
                  <Avatar>{item?.user_name?.trim()[0]}</Avatar>
                  <DetailComment>
                    <UserName>
                      {item?.user_name} - {item?.time_comment} -{' '}
                      {item?.topic_content}
                    </UserName>
                    <ContentComment>{item?.comment_detail}</ContentComment>
                  </DetailComment>
                </Comment>
              ))}
            </ListComment>
          </WrapperDetail>
        </ContainerBody>
      )}
    </Container>
  );
};

export default DetailHotel;
