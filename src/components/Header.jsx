import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  return (
    <HeaderContainer>
      <h1>
        <TitleLink to="/">가계부</TitleLink>
        <NavLink to="/mypage">마이페이지</NavLink>
      </h1>
      <StyledNav>
        {isAuthenticated ? (
          <>
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
