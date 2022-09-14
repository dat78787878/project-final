import React, { useState } from 'react';
import { Container } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import {
  CompanyList,
  ImageIcon,
  ImageLog,
  Inquiry,
  News,
  StyleHeader,
  StyleLeft,
  StyleLogo,
  StyleMenu,
  StyleSetting,
  StyleWrapper,
} from './styles';
import { Database} from 'react-feather';

import CompanyIcon from '../../../assets/images/icon_hotel.png';
import Logo from '../../../assets/images/logo.jpg';

const Header = () => {

  return (
    <StyleHeader>
      <Container maxW="container.xl">
        <StyleWrapper>
          <StyleLeft>
            <Link to="/company">
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
           
            </StyleMenu>
          </StyleLeft>

        
        </StyleWrapper>
      </Container>
    </StyleHeader>
  );
};

export default Header;
