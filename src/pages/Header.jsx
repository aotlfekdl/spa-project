import React from 'react'
import styled from 'styled-components'
import { Navigate, useNavigate } from 'react-router-dom';
import { PiTreeEvergreenDuotone } from "react-icons/pi"
import useUserStore from '../store/userStore';


const HeaderDiv = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-around;
  text-align: justify;
  
  div{
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;

    p{
        font-weight: bold;
        font-size: x-large;
    }

  }
`
const Header = () => {
    const navigate = useNavigate();
    const currentUser = useUserStore((s) => s.currentUser);
    
  return (
    <HeaderDiv>
        <div>//아이콘 들어갈 자리</div>
        <div>
            <PiTreeEvergreenDuotone />
            <p onClick={() => navigate('/')}>HOME</p>
            </div>
        <div>
            <p onClick={() => navigate(`/board/${currentUser.id}`)}>게시판 작성하기</p>
        </div>
        
    </HeaderDiv>
  )
}

export default Header