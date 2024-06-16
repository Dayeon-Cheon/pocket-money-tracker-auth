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
        <TitleLink to="/">모두의 가계부</TitleLink>
      </h1>
      <StyledNav>
        {isAuthenticated ? (
          <>
            {userInfo.avatar ? (
              <NavLink to="/mypage">
                <AvatarImg src={userInfo.avatar} alt="프로필 이미지" />
              </NavLink>
            ) : (
              <></>
            )}
            <NavLink to="/mypage">{userInfo.nickname}님 안녕하세요.</NavLink>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
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
  align-items: center;
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
  align-items: center;
  gap: 10px;
`;

const AvatarImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const LogoutButton = styled.button`
  border: none;
  border-radius: 6px;
  width: 60px;
  height: 30px;
  background-color: firebrick;
  color: white;
  cursor: pointer;
`;
