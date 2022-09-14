import styled from 'styled-components';
import { colors } from '../../components/_principles';
export const ContainerFillter = styled.div`
  height: 91px;
  background-color: ${colors.white};
`;

export const ContainerSearch = styled.div`
  padding-top: 28px;
  margin-left: 69px;
`;

export const Container = styled.div``;

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
                            max-height: 3.2rem;
                           -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: normal;
                            -webkit-line-clamp: 3;
                            line-height: 1.6rem;
`;

export const Img = styled.img`
  width:100%;
  max-height:200px;
`;

export const ColItems = styled.div``;

export const ContainerHeaderButton = styled.div``;
