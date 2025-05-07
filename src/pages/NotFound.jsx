import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>404</Title>
      <Message>페이지를 찾을 수 없습니다</Message>
      <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
    </Container>
  );
};

export default NotFound;
