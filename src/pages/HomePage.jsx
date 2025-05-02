import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../store/userStore';
import { Navigate, useNavigate } from 'react-router-dom';

const FullDiv = styled.div`
  padding-top: 100px;
  width: 100vw;
  height: 100vh;
  display: flex;
  background: fixed;
  background: #f0f2f5;
  box-sizing: border-box;

`;

const FirstDiv = styled.div`
  height: 100%;
  width: 60%;
`;
const SecondDiv = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

const FormStyle = styled.form`
  width: 350px;
  height: 270px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #484d6d;
  align-items: center;
  justify-content: center;
  box-shadow:
    0px 2px 4px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: white;

  input {
    height: 40px;
    width: 250px;
    border-radius: 8px;
    border: 1px solid #adadad;
    padding-left: 15px;
  }

  button {
    border: 1px solid black;
    height: 40px;

    &:hover {
      cursor: pointer;
      background: #34c470;
    }
  }
`;

const UserListDiv = styled.div`
  width: 350px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #484d6d;
  align-items: flex-start;

  box-shadow:
    0px 2px 4px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: white;
`;

const UserTitle = styled.div`
  background-color: #77d177;
  width: 100%;
  height: 50px;
  align-content: center;
  font-size: large;
  font-weight: bold;
`;

const BoardDiv = styled.div`
  width: 95%;
  height: 600px;
  background: white;
  border: 1px solid gray;
  margin: 0 auto;
  margin-left: 10%;
`;

const LoginDiv = styled.div`
  width: 350px;
  height: 270px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 10px;
  border: 1px solid #484d6d;
  align-items: center;
  justify-content: center;
  box-shadow:
    0px 2px 4px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: white;

  input {
    height: 40px;
    width: 250px;
    border-radius: 8px;
    border: 1px solid #adadad;
    padding-left: 15px;
  }
  p{
    font-size: medium;
    font-weight: bold;
    
    margin: 0%;;
  }

  button {
    border: 1px solid black;
    height: 40px;

    &:hover {
      cursor: pointer;
      background: #34c470;
    }
  }

  img {
    margin-top: 10px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
  }

  div{
    display: flex;
    gap: 15px;
  }
`;
const HomePage = () => {
  const users = useUserStore((s) => s.users);
  const getUsers = useUserStore((s) => s.getUsers);
  const loginUser = useUserStore((s) => s.loginUser);
  const currentUser = useUserStore((s) => s.currentUser);
  const logoutUser = useUserStore((s) => s.logoutUser);

  const [loginData, setLoginData] = useState({ id: '', pwd: '' });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { success, user } = await loginUser(loginData.id, loginData.pwd);
      if (success) {
        alert(`로그인 성공! ${user.name}님 환영합니다!`);
      }
      navigate('/');
    } catch {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      navigate('/');
    }
  };

  const handleLogout = async () =>{
    
    
    await logoutUser();
    navigate('/')
  }

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (currentUser) {
    return (
      <FullDiv>
        <FirstDiv>
          <BoardDiv>
            <UserTitle>게시판 목록</UserTitle>
          </BoardDiv>
        </FirstDiv>
        <SecondDiv>
          <LoginDiv>
            <img src={currentUser.imgUrl} alt="" />
            <p>{currentUser.name}님</p> 
            <p>{currentUser.email}</p>
            <div>
            <button onClick={() => navigate(`/users/${currentUser.id}`)}>마이페이지</button>
            <button onClick={handleLogout}>로그아웃</button>
            </div>
          </LoginDiv>
          <UserListDiv>
            <UserTitle>회원목록</UserTitle>

            <ul style={{ paddingLeft: '20px' }}>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.nickName}) - 나이: {user.age}
                </li>
              ))}
            </ul>
          </UserListDiv>
        </SecondDiv>
      </FullDiv>
    );
  } else {
    return (
      <FullDiv>
        <FirstDiv>
          <BoardDiv>
            <UserTitle>게시판 목록</UserTitle>
          </BoardDiv>
        </FirstDiv>
        <SecondDiv>
          <FormStyle onSubmit={handleLoginSubmit}>
            <input
              type="text"
              name="id"
              value={loginData.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
            <input
              type="text"
              name="pwd"
              value={loginData.pwd}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
            <button type="submit">로그인</button>
            <button type="button" onClick={() => navigate('/register')}>
              새 계정 만들기
            </button>
          </FormStyle>
          <UserListDiv>
            <UserTitle>회원목록</UserTitle>

            <ul style={{ paddingLeft: '20px' }}>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.nickName}) - 나이: {user.age}
                </li>
              ))}
            </ul>
          </UserListDiv>
        </SecondDiv>
      </FullDiv>
    );
  }
};

export default HomePage;
