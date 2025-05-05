  import { useNavigate } from 'react-router-dom';
  import styled from 'styled-components';
  import useUserStore from '../store/userStore';
  import * as yup from 'yup';
  import { useForm } from 'react-hook-form';
  import { yupResolver } from '@hookform/resolvers/yup';
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
    
    p{
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
    id: yup.string().required('아이디는 필수입니다.'),
    name: yup.string().required('이름은 필수입니다.'),
    pwd: yup.string().required('비밀번호는 필수입니다.'),
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


    const onSubmit = async (data) => {
      const formattedData = {
        ...data,
        isOnline: data.isOnline === "true",
      };
      try {
        await addUser(formattedData);
        performToast({ msg: '회원가입 성공!', type: 'success' });
      
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('회원가입 실패');
      }
    };

    const imgUrl = watch('imgUrl');


    return (
      <FullDiv>
        <FirstDivStyle>
          <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <ImgWrapper>
          <ImgStyle src={imgUrl || 'https://via.placeholder.com/150'} />
          </ImgWrapper>
            <input placeholder="아이디를 입력하세요" {...register('id')} />
            <p>{errors.id?.message}</p>
            <input  placeholder="이름을 입력하세요" {...register('name')} />
            <p>{errors.name?.message}</p>
            <input placeholder="비밀번호를 입력하세요" {...register('pwd')}  />
            <p>{errors.pwd?.message}</p>
            <input
              
              placeholder="이메일 입력하세요"
              {...register('email')} 
            />
              <p>{errors.email?.message}</p>
            <input placeholder="전화번호를 입력하세요" {...register('phone')} />
            <p>{errors.phone?.message}</p>
            <input placeholder="이미지 주소를 입력하세요" {...register('imgUrl')}  />
            <select {...register('isOnline')}>
            <option value="">상태를 선택하세요</option>
            <option value="true">온라인</option>
            <option value="false">오프라인</option>
            </select>
        
            <ButtonDivStyle>
              <SButtonStyle type="submit">회원가입</SButtonStyle>
              <button type="button" onClick={() => reset()}>초기화</button>
              <button onClick={() => navigate('/')}>뒤로가기</button>
    
            </ButtonDivStyle>
          </FormStyle>

        </FirstDivStyle>
      </FullDiv>
    );
  };

  export default UserRegistration;