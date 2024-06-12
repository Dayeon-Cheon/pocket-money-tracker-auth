import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newNickname, setNewNickname] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [isAuthenticated, navigate]);

  const handleNicknameChange = async (e) => {
    e.preventDefault();

    if (newNickname.trim().length < 1 || newNickname.trim().length > 10) {
      alert("닉네임을 1~10글자로 작성해 주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        { nickname: newNickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setUserInfo((prevState) => ({
          ...prevState,
          nickname: response.data.nickname,
        }));
        alert("닉네임이 변경되었습니다.");
        setNewNickname("");
      } else {
        alert("닉네임 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>마이페이지</h2>
      <p>아이디: {userInfo.id}</p>
      <p>닉네임: {userInfo.nickname}</p>

      <form onSubmit={handleNicknameChange}>
        <input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="새로운 닉네임을 입력해 주세요."
        />
        <button type="submit">변경</button>
      </form>
    </div>
  );
};

export default MyPage;
