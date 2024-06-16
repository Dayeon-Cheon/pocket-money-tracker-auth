import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { join } from "../api/auth";
import styled from "styled-components";

function Join() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();

    if (id.trim().length < 4 || id.trim().length > 10) {
      alert("아이디를 4~10글자로 작성해 주세요.");
      return;
    }
    if (password.trim().length < 4 || password.trim().length > 15) {
      alert("비밀번호를 4~15글자로 작성해 주세요.");
      return;
    }
    if (nickname.trim().length < 1 || nickname.trim().length > 10) {
      alert("닉네임을 1~10글자로 작성해 주세요.");
      return;
    }

    try {
      await join({ id, password, nickname });
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <JoinSection>
        <TitleDiv>회원가입</TitleDiv>
        <FormDiv onSubmit={handleJoin}>
          <JoinInput
            type="text"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            placeholder="아이디를 입력하세요. (4~10글자)"
          ></JoinInput>
          <JoinInput
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력하세요. (4~15글자)"
          ></JoinInput>
          <JoinInput
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="닉네임을 입력하세요. (1~10글자)"
          ></JoinInput>
          <JoinButton type="submit">회원가입</JoinButton>
          <StyledLink to="/login">로그인</StyledLink>
        </FormDiv>
      </JoinSection>
    </>
  );
}

export default Join;

const JoinSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-top: 100px;
`;

const TitleDiv = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  color: #333;
`;

const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
`;

const JoinInput = styled.input`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 250px;
  font-size: 16px;
`;

const JoinButton = styled.button`
  padding: 12px 20px;
  border-radius: 6px;
  border: none;
  background-color: orange;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 10px;
  color: orange;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;
