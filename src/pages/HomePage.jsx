import React, { useEffect, useState } from 'react';
import useUserStore from '../store/userStore';
import { Navigate, useNavigate } from 'react-router-dom';
import useBoardStore from '../store/boardStore';
import { performToast } from '../utils/performToast';
import { FaSearch } from 'react-icons/fa';

import { RingLoader } from 'react-spinners';
import { darkTheme, lightTheme } from '../utils/themes';
import styled, { ThemeProvider } from 'styled-components';

const FullDiv = styled.div`
  padding-top: 75px;
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
  height: 54%;
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
  overflow-y: auto;
`;

const BoardTitle = styled.div`
  background-color: #77d177;
  width: 100%;
  height: 50px;
  align-content: center;
  font-size: large;
  font-weight: bold;
  position: sticky;
  z-index: 1;
  top: 0;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100px;
    height: 40px;
    font-size: 13px;
    padding: 0;
  }
`;

const UserTitle = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  width: 100%;
  height: 50px;
  align-content: center;
  font-size: large;
  font-weight: bold;
  position: sticky;
  z-index: 1;
  top: 0;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100px;
    height: 40px;
    font-size: 13px;
    padding: 0;
  }
`;

const BoardDiv = styled.div`
  width: 95%;
  height: 90%;
  background: white;
  border: 1px solid gray;
  margin: 0 auto;
  margin-left: 10%;
  overflow-y: auto;
  border-radius: 8px;
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
  p {
    font-size: medium;
    font-weight: bold;

    margin: 0%;
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

  div {
    display: flex;
    gap: 15px;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledListItem = styled.li`
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: #f4f9f4;
  border: 1px solid #c6e6c6;
  border-radius: 6px;
  font-size: 24px;
  color: #333;
  transition: background-color 0.2s ease;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  font-weight: 800;

  p {
    width: 150px;
    margin: 0;
    text-align: center;
  }

  height: auto;
  max-height: 150px;
  &:hover {
    background-color: #e0f4e0;
  }

  img {
    height: 100px;
    width: 100px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 10%;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 50%;
  border: 1px solid #77d177;
  margin-bottom: 20px;
  border-radius: 8px;

  &:hover {
    border: 1px solid #77d177;
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  height: 30px;
  width: 30px;
  border: none;
  background: none;
  outline: none;
`;

const UserTag = styled.div`
  background: white;
  width: 100%;
  height: 30px;
  align-content: center;
  font-size: large;
  font-weight: bold;
  position: sticky;
  z-index: 2;
  top: 50px;
  display: flex;
  justify-content: space-around;

  p {
    margin: 0%;
    text-align: center;
  }
`;

const StyledListUserItem = styled.li`
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: #f4f9f4;
  border: 1px solid #c6e6c6;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  height: auto;
  max-height: 150px;
  &:hover {
    background-color: #e0f4e0;
  }
`;
const HomePage = () => {
  const users = useUserStore((s) => s.users);
  const getUsers = useUserStore((s) => s.getUsers);
  const loginUser = useUserStore((s) => s.loginUser);
  const currentUser = useUserStore((s) => s.currentUser);
  const logoutUser = useUserStore((s) => s.logoutUser);
  const { boards, loading, getBoards } = useBoardStore();
  const [loginData, setLoginData] = useState({ user_id: '', user_pwd: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const { success, user } = await loginUser(loginData.user_id, loginData.user_pwd);
  
      
      if (success) {
        performToast({ msg: `로그인 성공! ${user.user_name}님 환영합니다!`, type: 'success' });
      } else {
        performToast({ msg: '아이디 또는 비밀번호가 일치하지 않습니다.', type: 'error' });
      }
      navigate('/');
    } catch {
      alert('로그인중 오류가 발생했습니다.');

      navigate('/');
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    getBoards();
  }, [getBoards]);


  if (loading) {
    return <RingLoader color="#8cc3fc" />;
  }
console.log(boards);

  if (currentUser) {
    return (
      <FullDiv>
        <FirstDiv>
          <SearchForm action="">
            <SearchInput type="text" />
            <SearchButton type="submit">
              <FaSearch />
            </SearchButton>
          </SearchForm>

          <BoardDiv>
            <BoardTitle>게시판 목록</BoardTitle>
            <UserTag>
              <p>작성자</p>
              <p>제목</p>
              <p>이미지</p>
            </UserTag>
            <StyledList style={{ paddingLeft: '20px' }}>
              {boards.content?.length === 0 ? (
                
                <StyledListItem>게시글이 없습니다.</StyledListItem>
             
              ) : (
                boards.content?.map((board) => (
                    
               <StyledListItem key={board.board_no} onClick={() => navigate(`/boards/${board.board_no}`)}>
                 
                   
                    <p>{board.user_id}</p>
                    <p>{board.board_title}</p>
                    <img src={`http://localhost:8888/uploadFile/${board.change_name}`} alt="board img" />
                  </StyledListItem>
                ))
              )}
            </StyledList>
          </BoardDiv>
        </FirstDiv>
        <SecondDiv>
          <LoginDiv>
            <img src={`http://localhost:8888/uploadFile/${currentUser.change_name}`} alt="" />
            
            <p>{currentUser.user_name}님</p>
            <p>{currentUser.email}</p>
            <div>
              <button onClick={() => navigate(`/users/${currentUser.user_id}`)}>마이페이지</button>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          </LoginDiv>
          <UserListDiv>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
              <UserTitle>
                <p>온라인 회원목록</p>
                <button onClick={toggleTheme}>온라인/오프라인</button>
              </UserTitle>
            </ThemeProvider>
            <StyledList style={{ paddingLeft: '20px' }}>
              {isDark
                ? users
                    .filter((user) => !user.isOnline)
                    .map((user) => (
                      <StyledListUserItem key={user.user_id}>
                    
                    
                        {user.user_name}- <p>오프라인</p>
                      </StyledListUserItem>
                    ))
                : users
                    .filter((user) => user.isOnline)
                    .map((user) => (
                      <StyledListUserItem key={user.id}>
                        {user.name}- <p>온라인</p>
                      </StyledListUserItem>
                    ))}
            </StyledList>
          </UserListDiv>
        </SecondDiv>
      </FullDiv>
    );
  } else {
    return (
      <FullDiv>
        <FirstDiv>
          <SearchForm action="">
            <SearchInput type="text" />

            <SearchButton>
              <FaSearch />
            </SearchButton>
          </SearchForm>
          <BoardDiv>
            <BoardTitle>게시판 목록</BoardTitle>
            <UserTag>
              <p>작성자</p>
              <p>제목</p>
              <p>이미지</p>
            </UserTag>
            <StyledList style={{ paddingLeft: '20px' }}>
              {boards.content?.length === 0 ? (
                
                <StyledListItem>게시글이 없습니다.</StyledListItem>
             
              ) : (
                boards.content?.map((board) => (

                  <StyledListItem key={board.board_no} onClick={() => navigate(`/boards/${board.board_no}`)}>
               
                    <p>{board.user_id}</p>
                    <p>{board.board_title}</p>
                            <img src={`http://localhost:8888/uploadFile/${board.change_name}`} alt="board img" />
                  </StyledListItem>
                ))
              )}
            </StyledList>
          </BoardDiv>
        </FirstDiv>
        <SecondDiv>
          <FormStyle onSubmit={handleLoginSubmit}>
            <input
              type="text"
              name="user_id"
              value={loginData.user_id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
            <input
              type="password"
              name="user_pwd"
              value={loginData.user_pwd}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
            <button type="submit">로그인</button>
            <button type="button" onClick={() => navigate('/register')}>
              새 계정 만들기
            </button>
          </FormStyle>
          <UserListDiv>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
              <UserTitle>
                <p>온라인 회원목록</p>
                <button onClick={toggleTheme}>온라인/오프라인</button>
              </UserTitle>
            </ThemeProvider>
            <StyledList style={{ paddingLeft: '20px' }}>
              {isDark
                ? users
                    .filter((user) => !user.isOnline)
                    .map((user) => (
                      <StyledListUserItem key={user.id}>
                        {user.user_name}- <p>오프라인</p>
                      </StyledListUserItem>
                    ))
                : users
                    .filter((user) => user.isOnline)
                    .map((user) => (
                      <StyledListUserItem key={user.id}>
                        {user.user_name}- <p>온라인</p>
                      </StyledListUserItem>
                    ))}
            </StyledList>
          </UserListDiv>
        </SecondDiv>
      </FullDiv>
    );
  }
};

export default HomePage;
