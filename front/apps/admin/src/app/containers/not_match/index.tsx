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
      <Title>ページが見つかりません</Title>
      <Content>お探しのページが見つかりません。</Content>
      <Content>
        一時的にアクセスできない状況にあるか、移動もしくは削除された可能性があります。
      </Content>
      <ButtonWrap>
        <Link to="/">
          <Button color="#fff" background="rgb(112, 112, 112)">
            ホームページに戻る
          </Button>
        </Link>
      </ButtonWrap>
    </NotFoundPageWrapper>
  );
}

export default NotMatch;
