import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../store/userStore';
import { useEffect, useState } from 'react';

// import * as yup from 'yup';

const FullDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: fixed;
`;

const FirstDivStyle = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
  flex-direction: column;
  gap: 30px;
`;

const FormStyle = styled.form`
  padding-top: 20px;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #484d6d;
  align-items: center;
  justify-content: center;
  box-shadow:
    0px 2px 4px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: white;
  padding-bottom: 20px;

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
`;

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
function UserDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const users = useUserStore((state) => state.users);

  const getUsers = useUserStore((state) => state.getUsers);
  // const deleteUser = useUserStore((state) => state.deleteUser);
  // const currentUser = useUserStore((s) => s.currentUser);
  const updateUser = useUserStore((state) => state.updateUser);

  const user = users.find((u) => String(u.id) === id);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    pwd: '',
    email: '',
    phone: '',
    imgUrl: '',
  });

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name || '',
        pwd: '', // leave blank for security
        email: user.email || '',
        phone: user.phone || '',
        imgUrl: user.imgUrl || '',
      });
    }
  }, [user]);

  if (!user) {
    return <FullDiv>사용자를 찾을 수 없습니다.</FullDiv>;
  }

  if (!user) {
    return (
      <FullDiv>
        <Container>
          <Title>사용자를 찾을 수 없습니다.</Title>
          <ButtonGroup>
            <BackButton onClick={() => navigate('/')}>목록으로</BackButton>
          </ButtonGroup>
        </Container>
      </FullDiv>
    );
  }

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send updated data to store (and backend)
    const payload = { ...user, ...formData };
    // if pwd is empty, don't include it
    if (!payload.pwd) delete payload.pwd;
    await updateUser(user.id, payload);
    navigate('/');
  };

  // const handleDelete = async () => {
  //   await deleteUser(user.id);
  //   navigate('/');
  // };

  if (user) {
    return (
      <FullDiv>
        <FirstDivStyle>
          <FormStyle onSubmit={handleSubmit}>
            <ImgStyle src={formData.imgUrl || '/default.png'} alt="" />
            <input name="id" value={formData.id} readOnly />
            <input name="name" value={formData.name} onChange={handleChange} />
            <input name="pwd" value={formData.pwd} onChange={handleChange} placeholder="********" />
            <input name="email" value={formData.email} onChange={handleChange} />
            <input name="phone" value={formData.phone} onChange={handleChange} />
            <input name="imgUrl" value={formData.imgUrl} onChange={handleChange} />
            <ButtonDivStyle>
              <SButtonStyle type="submit">수정하기</SButtonStyle>
              <button onClick={() => navigate('/')}>뒤로가기</button>
            </ButtonDivStyle>
          </FormStyle>
        </FirstDivStyle>
      </FullDiv>
    );
  } else {
    return (
      <FullDiv>
        <Container>
          <Title>사용자를 찾을 수 없습니다.</Title>
          <ButtonGroup>
            <BackButton onClick={() => navigate('/')}>목록으로</BackButton>
          </ButtonGroup>
        </Container>
      </FullDiv>
    );
  }
}

export default UserDetail;
