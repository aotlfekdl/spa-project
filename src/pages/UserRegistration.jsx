import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../store/userStore';
import { useState } from 'react';
// import * as yup from 'yup';



const FullDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: fixed;
  box-sizing: border-box;
  padding-top: 70px;
`;

const FirstDivStyle = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
  flex-direction: column;
  gap: 20px;
`;

const FormStyle = styled.form`

  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
    width: 300px;
    border-radius: 8px;
    border: 1px solid #adadad;
    padding-left: 15px;
  }

  button {
    border: 1px solid black;

    &:hover {
      cursor: pointer;
      background: #34c470;
    }
  }
`;

const ImgStyle = styled.img`
  width: 150px;          
  height: 150px;
  border-radius: 50%;     
  object-fit: cover;      
  display: block;
  margin: 0 auto;        
  border: 1px solid black;

`

const ButtonDivStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const SButtonStyle = styled.button`
  background: #74da55;
`;
const UserRegistration = () => {
  const [users, setUsers] = useState({
    id: '',
    name: '',
    pwd: '',
    email: '',
    phone: '',
    imgUrl: '',
  });

  const addUser = useUserStore((state) => state.addUser); 


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(users);
      alert('회원가입 성공!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('회원가입 실패');
    }
  };

  return (
    <FullDiv>
      <FirstDivStyle>
        <FormStyle onSubmit={handleSubmit}>
          <ImgStyle src={customElements.imgUrl} >
          </ImgStyle>
          <input name="id" value={users.id} onChange={handleChange} placeholder="아이디를 입력하세요" />
          <input name="name" value={users.name} onChange={handleChange} placeholder="이름을 입력하세요" />
          <input name="pwd" value={users.pwd} onChange={handleChange} placeholder="비밀번호를 입력하세요" />
          <input
            name="email"
            type="email"
            value={users.email}
            onChange={handleChange}
            placeholder="이메일 입력하세요"
          />
          <input name="phone" value={users.phone} onChange={handleChange} placeholder="전화번호를 입력하세요" />
          
          <input name="imgUrl" value={users.imgUrl} onChange={handleChange} placeholder="이미지 주소를 입력하세요" />
          <ButtonDivStyle>
            <SButtonStyle type="submit">회원가입</SButtonStyle>
            <button type="reset" onClick={() => setUsers({ id: '', name: '', pwd: '', email: '', phone: '' })}>
              초기화
            </button>
          </ButtonDivStyle>
        </FormStyle>
        <button onClick={() => navigate('/')}>뒤로가기</button>
      </FirstDivStyle>
    </FullDiv>
  );
};

export default UserRegistration;