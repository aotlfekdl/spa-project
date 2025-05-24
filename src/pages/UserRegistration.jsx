import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../store/userStore';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { performToast } from '../utils/performToast';
import { useState } from 'react';

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
  user_id: yup.string().required('아이디는 필수입니다.'),
  user_name: yup.string().required('이름은 필수입니다.'),
  user_pwd: yup.string().required('비밀번호는 필수입니다.'),
  email: yup.string().email('유효하지 않은 이메일입니다.').required('이메일은 필수입니다.'),
  phone: yup.string().required('전화번호는 필수입니다.'),
});

const UserRegistration = () => {
  const addUser = useUserStore((state) => state.addUser);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = async (data) => {
    console.log('폼 제출 데이터:', data);
    // const formattedData = {

    //   user_id: data.user_id,
    //   user_pwd: data.user_pwd,
    //   user_name: data.user_name,
    //   email: data.email,
    //   phone: data.phone,
    //   gender: 'M',
    //   isDeleted: 'N',
    //   file: data.file,
    //   isOnline: data.isOnline === 'true',
    // };
    try {
      const formData = new FormData();
      formData.append('user_id', data.user_id);
      formData.append('user_pwd', data.user_pwd);
      formData.append('user_name', data.user_name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('isDeleted', 'N');
      formData.append('file', selectedFile);
      formData.append('status', data.status);
      await addUser(formData);
      performToast({ msg: '회원가입 성공!', type: 'success' });

      navigate('/');
    } catch (err) {
      console.error(err);
      alert('회원가입 실패');
    }
  };

  const imgUrl = watch('C:/dev_tool/member/');

  return (
    <FullDiv>
      <FirstDivStyle>
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
          <ImgWrapper>
            <ImgStyle src={imgUrl || 'https://placehold.co/150x150'} />
          </ImgWrapper>
          <input placeholder="아이디를 입력하세요" {...register('user_id')} />
          <p>{errors.user_id?.message}</p>
          <input placeholder="이름을 입력하세요" {...register('user_name')} />
          <p>{errors.user_name?.message}</p>
          <input placeholder="비밀번호를 입력하세요" {...register('user_pwd')} />
          <p>{errors.user_pwd?.message}</p>
          <input placeholder="이메일 입력하세요" {...register('email')} />
          <p>{errors.email?.message}</p>
          <input placeholder="전화번호를 입력하세요" {...register('phone')} />
          <p>{errors.phone?.message}</p>
          <input
            type="file"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]); // 실제 File 객체 저장
            }}
          />
          <select {...register('status')}>
            <option value="">상태를 선택하세요</option>
            <option value="Y">온라인</option>
            <option value="N">오프라인</option>
          </select>

          <ButtonDivStyle>
            <SButtonStyle type="submit">회원가입</SButtonStyle>
            <button type="button" onClick={() => reset()}>
              초기화
            </button>
            <button onClick={() => navigate('/')}>뒤로가기</button>
          </ButtonDivStyle>
        </FormStyle>
      </FirstDivStyle>
    </FullDiv>
  );
};

export default UserRegistration;
