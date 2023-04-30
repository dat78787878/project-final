import { Link } from 'react-router-dom';
import {
  ButtonWrap,
  Content,
  NotFoundPageWrapper,
  Text,
  Title,
  Warning,
} from './styles';
import Button from '@front/button';

function NotMatch() {
  return (
    <NotFoundPageWrapper>
      <Warning>
        <Text>404</Text>
      </Warning>
      <Title>Page Not Found</Title>
      <Content>The page you are looking for cannot be found.</Content>
      <Content>
      It may be temporarily inaccessible or may have been moved or deleted.
      </Content>
      <ButtonWrap>
        <Link to="/">
          <Button color="#fff" background="rgb(112, 112, 112)">
          Return to home page
          </Button>
        </Link>
      </ButtonWrap>
    </NotFoundPageWrapper>
  );
}

export default NotMatch;
