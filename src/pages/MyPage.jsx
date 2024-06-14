import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, updateProfile } from "../api/auth";

const MyPage = () => {
  const [newNickname, setNewNickname] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const navigate = useNavigate();

  const {
    data: userInfo = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["user"], queryFn: getUserInfo });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickname", newNickname);
    formData.append("avatar", newAvatar);

    try {
      await updateProfile(formData);
      navigate("/");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (isLoading) {
    <div>로딩 중입니다.</div>;
  }

  if (error) {
    <div>에러가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  return (
    <div>
      <h2>마이페이지</h2>
      <p>아이디: {userInfo.id}</p>
      <p>닉네임: {userInfo.nickname}</p>

      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="새로운 닉네임을 입력해 주세요."
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewAvatar(e.target.files[0])}
        />
        <button type="submit">변경</button>
      </form>
    </div>
  );
};

export default MyPage;
