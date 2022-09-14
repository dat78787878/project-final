import styled from 'styled-components';

export const NotFoundPageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding: 50px;
  text-align: center;

  p {
    margin-bottom: 20px;
  }

  button {
    color: #fff;
  }
`;

export const Text = styled.div``;

export const Warning = styled.div`
  width: 150px;
  height: 150px;
  background: #ffa100;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dashed #4e4e4e;
  border-radius: 13px;
  font-size: 71px;
  transform: rotate(45deg);
  margin-bottom: 63px;

  ${Text} {
    transform: rotate(-45deg);
  }
`;

export const Title = styled.div`
  font-size: 25px;
  word-spacing: 4px;
  letter-spacing: 4px;
  margin-bottom: 30px;
`;

export const Content = styled.div``;

export const ButtonWrap = styled.div`
  margin-top: 20px;
  width: 220px;
  height: 43px;
`;
