import { Link } from "react-router-dom";
import { useState } from "react";

function Join() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleJoin = () => {
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
  };

  return (
    <>
      <section>
        <div>회원가입</div>
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
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="닉네임을 입력하세요."
          ></input>
          <button onClick={handleJoin}>회원가입</button>
          <Link to="/login">로그인</Link>
        </div>
      </section>
    </>
  );
}

export default Join;
