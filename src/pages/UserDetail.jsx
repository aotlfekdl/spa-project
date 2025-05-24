import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../store/userStore';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { performToast } from '../utils/performToast';

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
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
  flex-direction: column;
`;

const FormStyle = styled.form`
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #484d6d;
  align-items: center;
  justify-content: center;
  box-shadow:
    0px 2px 4px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: white;

  p {
    font-size: 10px;
    margin: 0;
    color: red;
  }

  select {
    height: 30px;
  }

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

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

const ImgStyle = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
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

const schema = yup.object().shape({
  user_name: yup.string().required('이름은 필수입니다.'),
  email: yup.string().email('유효하지 않은 이메일입니다.').required('이메일은 필수입니다.'),
  phone: yup.string().required('전화번호는 필수입니다.'),
  user_pwd: yup.string(),
});

const UserDetail = () => {
  const navigate = useNavigate();

  const getUsers = useUserStore((state) => state.getUsers);
  const updateUser = useUserStore((state) => state.updateUser);
  const currentUser = useUserStore((s) => s.currentUser);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imgPreview, setImgPreview] = useState('');

  {
    console.log('currentUsercurrentUser:', currentUser);
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  {
    console.log(currentUser.user_id);
  }
  useEffect(() => {
    getUsers(currentUser.user_id);
  }, [getUsers]);


  useEffect(() => {
    if (currentUser) {
      setValue('user_id', currentUser.user_id || '');
      setValue('user_name', currentUser.user_name || '');
      setValue('email', currentUser.email || '');
      setValue('phone', currentUser.phone || '');
      setValue('user_pwd', '');
      setValue('status', currentUser.status === 'Y' ? 'Y' : 'N');
      setImgPreview(currentUser.change_name ? `http://localhost:8888/uploadFile/${currentUser.change_name}` : '');
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data) => {
    console.log('폼 제출 데이터:', data);
    try {
      const formData = new FormData();
      formData.append('user_name', data.user_name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      if (data.pwd) formData.append('user_pwd', data.pwd);
      formData.append('status', data.status);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      console.log('123123', currentUser.user_id);
      console.log(formData);
      await updateUser(currentUser.user_id, formData);
      performToast({ msg: '수정 성공!', type: 'success' });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('수정 실패');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }
  };

  if (!currentUser) {
    return (
      <FullDiv>
        <FirstDivStyle>사용자를 찾을 수 없습니다.</FirstDivStyle>
      </FullDiv>
    );
  }

  return (
    <FullDiv>
      <FirstDivStyle>
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
          <ImgWrapper>
            <ImgStyle src={imgPreview || 'https://placehold.co/150x150'} />
          </ImgWrapper>
          <input placeholder="아이디" {...register('user_id')} readOnly />
          <p>{errors.user_id?.message}</p>
          <input placeholder="이름" {...register('user_name')} />
          <p>{errors.user_name?.message}</p>
          <input placeholder="비밀번호 (변경 시 입력)" type="password" {...register('user_pwd')} />
          <p>{errors.user_pwd?.message}</p>
          <input placeholder="이메일" {...register('email')} />
          <p>{errors.email?.message}</p>
          <input placeholder="전화번호" {...register('phone')} />
          <p>{errors.phone?.message}</p>
          <input type="file" onChange={handleFileChange} {...register('file')} />
          <select {...register('status')}>
            <option value="Y">온라인</option>
            <option value="N">오프라인</option>
          </select>
          <ButtonDivStyle>
            
            <SButtonStyle type="submit">수정하기</SButtonStyle>
            <button type="button" onClick={() => navigate('/')}>
              뒤로가기
            </button>
          </ButtonDivStyle>
        </FormStyle>
      </FirstDivStyle>
    </FullDiv>
  );
};

export default UserDetail;
