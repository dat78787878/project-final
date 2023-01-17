import styled from 'styled-components';
import { colors } from '../../components/_principles';
export const ContainerFillter = styled.div`
  display: flex;
  height: 91px;
  background-color: ${colors.white};
`;

export const ContainerHeaderButton = styled.div``;
export const Container = styled.div``;

export const ContainerSearch = styled.div`
  padding-top: 28px;
  margin-left: 69px;
`;
export const SelectTopic = styled.div`
  padding-top: 28px;
  margin-left: 69px;
  width: 192px;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

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
