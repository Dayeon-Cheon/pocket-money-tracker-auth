import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() === "") {
      alert("아이디를 입력하세요.");
      return;
    }
    if (password.trim() === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }
  };

  return (
    <>
      <section>
        <div>로그인</div>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
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
          <button onClick={handleLogin}>로그인</button>
          <Link to="/join">회원가입</Link>
        </div>
      </section>
    </>
  );
}

export default Login;
