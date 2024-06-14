import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/auth";
import styled from "styled-components";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: userInfo = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["user"], queryFn: getUserInfo });

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  if (isLoading) {
    <div>로딩 중입니다.</div>;
  }

  if (error) {
    <div>에러가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  return (
    <HeaderContainer>
      <h1>
        <TitleLink to="/">가계부</TitleLink>
        <NavLink to="/mypage">마이페이지</NavLink>
      </h1>
      <StyledNav>
        {isAuthenticated ? (
          <>
            <div>
              <img src={userInfo.avatar} alt="프로필 이미지" />
            </div>
            <div>{userInfo.nickname}님 안녕하세요.</div>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <NavLink to="/login">로그인</NavLink>
            <NavLink to="/join">회원가입</NavLink>
          </>
        )}
      </StyledNav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TitleLink = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
