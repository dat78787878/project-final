import styled from 'styled-components';
import { colors } from '../../components/_principles';
import { navLinkIcon } from '../../components/_principles/styles';

export const StyleHeader = styled.div`
  background-color: ${colors.white};
  color: ${colors.black};
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100000;
  border-bottom: 1px solid #adbccb;
`;

export const StyleWrapper = styled.div`
  height: 96px;
  display: flex;
  grid-template-columns: auto auto auto;
  justify-content: space-between;
  align-items: center;
`;

export const StyleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 144px;

  @media (max-width: 1010px) {
    gap: 60px;
  }
`;

export const StyleLogo = styled.div`
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ImageLog = styled.img`
  width: 70px;
`;

export const StyleMenu = styled.div`
  display: flex;
  gap: 90px;
  font-weight: bold;
  line-height: 29px;
  font-size: 16px;

  .nav-link {
    &.active {
      color: ${colors.green.teal};
    }

    &:hover {
      color: ${colors.green.teal};
    }

    svg {
      color: ${colors.black};
    }
  }

  @media (max-width: 1010px) {
    gap: 30px;
  }

  @media (max-width: 798px) {
    font-size: 13px;
  }
`;

export const CompanyList = styled.span`
  ${navLinkIcon}
`;

export const Inquiry = styled.span`
  ${navLinkIcon}
`;

export const News = styled.span`
  ${navLinkIcon}
`;

export const StyleSetting = styled.div`
  ${navLinkIcon}
  cursor: pointer;
  font-size: 16px;
`;

export const ImageIcon = styled.img`
  width: 24px;
  height: 24px;
`;
