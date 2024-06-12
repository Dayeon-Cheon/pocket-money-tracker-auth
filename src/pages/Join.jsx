import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id,
          password,
          nickname,
        }
      );
      const data = response.data;
      if (data.success) {
        navigate("/login");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <>
      <section>
        <div>회원가입</div>
        <form onSubmit={handleJoin}>
          <div>
            <input
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="아이디를 입력하세요. (4~10글자)"
            ></input>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="비밀번호를 입력하세요. (4~15글자)"
            ></input>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              placeholder="닉네임을 입력하세요. (1~10글자)"
            ></input>
            <button type="submit">회원가입</button>
            <Link to="/login">로그인</Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Join;
