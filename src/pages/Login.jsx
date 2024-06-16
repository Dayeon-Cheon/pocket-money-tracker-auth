import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (id.trim() === "") {
      alert("아이디를 입력하세요.");
      return;
    }
    if (password.trim() === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }

    try {
      const data = await userLogin({ id, password });
      if (data && data.accessToken) {
        login(data.accessToken);
        navigate("/");
      } else {
        alert("로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <LoginSection>
        <TitleDiv>로그인</TitleDiv>
        <FormDiv onSubmit={handleLogin}>
          <LoginInput
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요."
          />
          <LoginInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요."
          />
          <LoginButton type="submit">로그인</LoginButton>
          <StyledLink to="/join">회원가입</StyledLink>
        </FormDiv>
      </LoginSection>
    </>
  );
}

export default Login;

const LoginSection = styled.section`
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

const LoginInput = styled.input`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 250px;
  font-size: 16px;
`;

const LoginButton = styled.button`
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
