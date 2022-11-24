import styled from 'styled-components';
import { colors } from '../../components/_principles';

export const Container = styled.div``;
export const Infor = styled.div``;
export const HotelName = styled.div`
  display: -webkit-box;
  font-weight: bold;
  max-height: 3.2rem;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 3;
  line-height: 1.6rem;
`;

export const Address = styled.div`
  display: -webkit-box;
  font-weight: bold;
  max-height: 6.2rem;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 4;
  line-height: 1rem;
  margin: 10px 0px;
`;

export const LinkHotel = styled.a`
  font-weight: bold;
  max-height: 6.2rem;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 4;
  line-height: 1rem;
  margin: 10px 0px;
  &:hover {
    color: ${colors.green.teal};
    cursor: pointer;
  }
`;

export const Img = styled.img`
  width: 100%;
`;

export const WrapperDetail = styled.div`
  padding: 50px 20%;

  @media only screen and (max-width: 820px) {
    padding: 20px 10%;
  }
`;

export const ListComment = styled.div``;
export const Comment = styled.div`
  padding-top: 10px;
  display: grid;
  grid-template-columns: 8% 92%;
`;
export const DetailComment = styled.div``;
export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  display: flex;

  align-items: center;

  justify-content: center;
  border: 1px solid;
  border-radius: 50%;
  font-size: 1.875rem;
  font-weight: 500;
  margin-right: 8px;
  color: rgb(0, 0, 0);

  @media only screen and (max-width: 768px) {
  }

  @media only screen and (max-width: 475px) {
    width: 40px;
    height: 40px;
    margin: 10px;
  }
`;

export const Title = styled.h3`
  color: ${colors.black};
  font-weight: bold;
  font-size: 1.313rem;
  word-break: break-all;
  margin-top: 10px;
`;

export const UserName = styled.div`
  margin-right: 8px;
  font-weight: 600;
  font-size: 1rem;

  @media only screen and (max-width: 400px) {
    margin-right: 4px;
  }
`;

export const ContentComment = styled.div`
  max-height: 4.5rem;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 4;
  line-height: 1.6rem;
  text-align: justify;
  letter-spacing: 2px;
`;
