import { Container } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';

import {
  CompanyList,
  ImageIcon,
  ImageLog,
  Inquiry,
  StyleHeader,
  StyleLeft,
  StyleLogo,
  StyleMenu,
  StyleWrapper,
} from './styles';
import { Database, File, PieChart } from 'react-feather';

import CompanyIcon from '../../../assets/images/icon_hotel.png';
import Logo from '../../../assets/images/logo.jpg';

const Header = () => {
  return (
    <StyleHeader>
      <Container maxW="container.xl">
        <StyleWrapper>
          <StyleLeft>
            <Link to="/admin">
              <StyleLogo>
                <ImageLog src={Logo} alt="logo" />
              </StyleLogo>
            </Link>
            <StyleMenu>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
              >
                <CompanyList>
                  <ImageIcon src={CompanyIcon} alt="company-icon" />
                  Hotel
                </CompanyList>
              </NavLink>
              <NavLink
                to="/list_comment"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
              >
                <Inquiry>
                  <Database />
                  Comment
                </Inquiry>
              </NavLink>

              <NavLink
                to="/report"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
              >
                <Inquiry>
                  <File />
                  Report
                </Inquiry>
              </NavLink>

              <NavLink
                to="/statistical"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
              >
                <Inquiry>
                  <PieChart />
                  Statistical
                </Inquiry>
              </NavLink>
            </StyleMenu>
          </StyleLeft>
        </StyleWrapper>
      </Container>
    </StyleHeader>
  );
};

export default Header;
