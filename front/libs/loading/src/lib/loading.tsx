import { Spinner } from '@chakra-ui/react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LoadingProps {
  size?: string;
  color?: string;
}

const StyledLoading = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  div {
    color: ${(props) => props.color};
  }
`;

export function Loading({ color = '#2CA3A3', size = 'lg' }: LoadingProps) {
  return (
    <StyledLoading color={color}>
      <Spinner thickness="3px" speed="0.65s" emptyColor="white" size={size} />
    </StyledLoading>
  );
}

export default Loading;
