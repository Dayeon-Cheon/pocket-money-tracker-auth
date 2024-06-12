import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

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
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id,
          password,
        }
      );
      const data = response.data;
      if (data.success) {
        login(data.accessToken);
        navigate("/");
      } else {
        alert("로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <>
      <section>
        <div>로그인</div>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="아이디를 입력하세요."
            ></input>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="비밀번호를 입력하세요."
            ></input>
            <button type="submit">로그인</button>
            <Link to="/join">회원가입</Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
