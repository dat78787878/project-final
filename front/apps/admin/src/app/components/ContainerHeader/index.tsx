import React from 'react';
import { DivWrap, Title } from './styles';

type Props = {
  title: string;
  element?: React.ReactNode;
};

function ContainerHeader({ title, element }: Props) {
  return (
    <DivWrap>
      <Title>{title}</Title>
      {element}
    </DivWrap>
  );
}

export default ContainerHeader;
