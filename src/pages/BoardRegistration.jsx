import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../store/userStore';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useBoardStore from '../store/boardStore';

import { performToast } from '../utils/performToast';
import { RingLoader } from 'react-spinners';

const FullDiv = styled.form`
  width: 100vw;
  height: 100%;
  display: flex;
  background: fixed;
  box-sizing: border-box;
  padding-top: 70px;
  flex-direction: column;
  padding-bottom: 50px;
`;

const FirstDivStyle = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
`;

const FormStyle = styled.div`
  width: 900px;
  min-height: 600px;
  display: flex;
  flex-direction: column;

  border: 1px solid #484d6d;
  align-items: center;

  box-shadow:
    0px 2px 4px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: white;
  box-sizing: border-box;

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

const FormFirstDiv = styled.div`
  height: 60px;
  border: 1px solid black;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 10%;
  gap: 20px;
  box-sizing: border-box;

  input {
    width: auto;
  }
`;
const FormSecondDiv = styled.div`
  height: 60px;
  width: 100%;
  border: 1px solid black;

  input {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0%;
    padding: 0;
    border-radius: 0px;
    border: 1px solid #cccccc;
    padding-left: 30px;
    font-size: x-large;
  }
`;

const PDiv = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 30px;
  gap: 30px;
`;
const PStyle = styled.p`
  font-size: bold;
`;

const FormThreeDiv = styled.div`
  min-height: 400px;
  height: auto;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  textarea {
    margin-top: 20px;
    width: 95%;
    min-height: 400px;
    resize: none;
    border: 1px solid #cccccc;
    border-radius: 8px;
    padding: 20px;
    font-size: 16px;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 20px;
  }
`;


const BottomHeader = styled.div`
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;

  justify-content: end;
  text-align: justify;

  button {
    margin-right: 60px;
    background: #e0dfdf;
  }
`;

const BoardRegistration = () => {
  const [boards, setBoards] = useState({
    userId: '',
    name: '',
    title: '',
    context: '',
    imgUrl: '',
  });

  const currentUser = useUserStore((s) => s.currentUser);

  const { addBoard, loading } = useBoardStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoards((prev) => ({
      ...prev,
      userId: currentUser.id,
      name: currentUser.name,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBoard(boards);
      performToast({ msg: '게시글 등록 성공!', type: 'success' });

      alert(`게시 성공`);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('등록 실패');
      navigate('/');
    }
  };

  return (
    <FullDiv onSubmit={handleSubmit}>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <RingLoader color="#8cc3fc" />
        </div>
      )}
      <FirstDivStyle>
        <FormStyle>
          <FormFirstDiv>
            <p>작성자</p>

            <input type="hidden" name="userid" onChange={handleChange} value={currentUser.id} />
            <input type="text" name="name" onChange={handleChange} value={currentUser.name} readOnly />
          </FormFirstDiv>
          <FormSecondDiv>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={boards.title}
              placeholder="제목을 입력해주세요."
            />
          </FormSecondDiv>
          <PDiv>
            <PStyle>내용</PStyle>
            <input
              type="text"
              name="imgUrl"
              onChange={handleChange}
              value={boards.imgUrl}
              placeholder="이미지URL입력해주세요요"
            />
          </PDiv>
          <FormThreeDiv>
            <TextareaAutosize
              name="context"
              value={boards.context}
              onChange={handleChange}
              minRows={5}
              placeholder="내용을 입력해주세요."
              style={{
                width: '95%',
                padding: '20px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </FormThreeDiv>
        </FormStyle>
      </FirstDivStyle>
      <BottomHeader>
        <button type="button" onClick={() => navigate('/')}>
          뒤로가기
        </button>
        <button type="submit">등록하기</button>
      </BottomHeader>
    </FullDiv>
  );
};

export default BoardRegistration;
