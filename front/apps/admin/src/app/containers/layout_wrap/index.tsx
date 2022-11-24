import { Container } from '@chakra-ui/react';
import React from 'react';
import Header from '../header';
import { StyleBody, StyleLayout } from './styles';

const LayoutWrap = ({ children }: React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <StyleLayout>
      <Header />
      <StyleBody>
        <Container maxW="container.xl">{children}</Container>
      </StyleBody>
    </StyleLayout>
  );
};

export default LayoutWrap;
