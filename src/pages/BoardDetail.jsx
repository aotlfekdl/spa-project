import styled from 'styled-components';
import {  useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useBoardStore from '../store/boardStore';
// import * as yup from 'yup';
import { performToast } from '../utils/performToast';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

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

const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const allBoards = useBoardStore((s) => s.boards);
    const getBoards = useBoardStore((s) => s.getBoards);
    const updateBoard = useBoardStore((s) => s.updateBoard);

    const currentUser = useUserStore((s) => s.currentUser);
  
    const board = allBoards.find((b) => String(b.id) === id);
  
    const [formData, setFormData] = useState({
      userId: '',
      name: '',
      title: '',
      context: '',
      imgUrl: '',
    });
  
    useEffect(() => {
      getBoards();
    }, [getBoards]);
  
    useEffect(() => {
      if (board) {
        setFormData({
          userId: board.userId,
          name: board.name,
          title: board.title || '',
          context: board.context || '',
          imgUrl: board.imgUrl || '',
        });
      }
    }, [board]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateBoard(id, formData);
        performToast({ msg: '게시글 수정 완료!', type: 'success' });
        navigate('/');
      } catch (err) {
        console.error(err);
        performToast({ msg: '수정 실패', type: 'error' });
      }
    };
  
    return (
      <FullDiv onSubmit={handleSubmit}>
        
        <FirstDivStyle>
          <FormStyle>
  
            <FormFirstDiv>
              <p>작성자</p>
              <input type="text" name="name" value={formData.name} readOnly />
            </FormFirstDiv>
            <FormSecondDiv>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={board.userId === currentUser?.id ? handleChange : undefined}
                readOnly={board.userId !== currentUser?.id}
         
                placeholder="제목을 입력해주세요."
              />
            </FormSecondDiv>
            <PDiv>
              <PStyle>내용</PStyle>
              <input
                type="text"
                name="imgUrl"
                value={formData.imgUrl}
                onChange={board.userId === currentUser?.id ? handleChange : undefined}
                readOnly={board.userId !== currentUser?.id}
                placeholder="이미지 URL을 입력해주세요"
              />
            </PDiv>
            <FormThreeDiv>
              <TextareaAutosize
                name="context"
                value={formData.context}
                onChange={board.userId === currentUser?.id ? handleChange : undefined}
                readOnly={board.userId !== currentUser?.id}
                minRows={5}
                placeholder="내용을 입력해주세요."
              />
            </FormThreeDiv>
          </FormStyle>
        </FirstDivStyle>
        <BottomHeader>
            {board.userId === currentUser?.id ? 
          <button type="submit">수정 완료</button> :
          <button type="button" onClick={() => navigate('/')}>뒤로가기</button>}
        </BottomHeader>
      </FullDiv>
    );
  };
  
  export default BoardDetail;