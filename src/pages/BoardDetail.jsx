import styled from 'styled-components';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useBoardStore from '../store/boardStore';
// import * as yup from 'yup';
import { performToast } from '../utils/performToast';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
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

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useUserStore((s) => s.currentUser);
  const board = useBoardStore((s) => s.boardDetail);
  const [selectedFile, setSelectedFile] = useState(null);
const deleteBoard = useBoardStore((s) => s.deleteBoard);


  const getBoardInfo = useBoardStore((s) => s.getBoardInfo);
  const { updateBoard, loading } = useBoardStore();
  const [formData, setFormData] = useState({

  });
 
  useEffect(() =>{
    getBoardInfo(id);
  }, [getBoardInfo]);
  

  
  useEffect(() => {
    if (board) {
      setFormData({
        user_id: board.user_id,
        user_name: board.user_name,
        board_title: board.board_title || '',
        board_content: board.board_content || '',
        file: board.origin_name || '',
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
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
  };

  const handleDelete = async () => {
  if (!window.confirm('정말 삭제하시겠습니까?')) return;

  try {
    await deleteBoard(board.board_no); // 또는 board.id
    performToast({ msg: '게시글이 삭제되었습니다.', type: 'success' });
    navigate('/');  
  } catch (error) {
    console.log(error);
    performToast({ msg: '삭제 실패', type: 'error' });
  }
};
  const onPass = !!currentUser && currentUser.user_id === board?.user_id;
const handleSubmit = async (e) => {
  e.preventDefault(); // ✅ prevent default behavior

  try {
    const requestData = new FormData();
    requestData.append('board_title', formData.board_title);
    requestData.append('board_content', formData.board_content);
    if (selectedFile) {
      requestData.append('file', selectedFile);
    }
    console.log("requestData:",requestData);
    await updateBoard(id, requestData);
    performToast({ msg: '게시글 수정 완료!', type: 'success' });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  } catch (err) {
    console.error(err);
    performToast({ msg: '수정 실패', type: 'error' });
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
            <input type="text" name="user_name" value={formData.user_name} readOnly />
          </FormFirstDiv>
          <FormSecondDiv>
            <input
              type="text"
              name="board_title"
              value={formData.board_title}
              onChange={onPass ? handleChange : undefined}
              readOnly={!onPass}
              placeholder="제목을 입력해주세요."
            />
          </FormSecondDiv>
          <PDiv>
            <PStyle>첨부파일</PStyle>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              readOnly={!onPass}
              placeholder="이미지 URL을 입력해주세요"
            />
          </PDiv>
          <FormThreeDiv>
            <TextareaAutosize
              name="board_content"
              value={formData.board_content}
              onChange={onPass ? handleChange : undefined}
              readOnly={!onPass}
              minRows={5}
              placeholder="내용을 입력해주세요."
            />
          </FormThreeDiv>
        </FormStyle>
      </FirstDivStyle>
      <BottomHeader>
        {onPass ? (
          <>
             <button type="button" onClick={handleDelete}>삭제하기</button>
            <button type="submit">수정하기</button>
            <button type="button" onClick={() => navigate('/')}>
              뒤로가기
            </button>
          </>
        ) : (
          <button type="button" onClick={() => navigate('/')}>
            뒤로가기
          </button>
        )}
      </BottomHeader>
    </FullDiv>
  );
};

export default BoardDetail;
