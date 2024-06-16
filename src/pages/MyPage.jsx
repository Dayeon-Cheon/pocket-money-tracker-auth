import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, updateProfile } from "../api/auth";
import styled from "styled-components";

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
    <MyPageSection>
      <div>
        <TitleDiv>마이페이지</TitleDiv>
        <ProfileDiv>
          <p>아이디: {userInfo.id}</p>
          <p>현재 닉네임: {userInfo.nickname}</p>
        </ProfileDiv>
      </div>
      <div>
        <FormDiv onSubmit={handleUpdateProfile}>
          <ProfileInput
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            placeholder="새로운 닉네임을 입력해 주세요."
          />
          <ProfileInput
            type="file"
            accept="image/*"
            onChange={(e) => setNewAvatar(e.target.files[0])}
          />
          <UpdateButton type="submit">변경</UpdateButton>
        </FormDiv>
      </div>
    </MyPageSection>
  );
};

export default MyPage;

const MyPageSection = styled.section`
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const TitleDiv = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  color: #333;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileInput = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 400px;
  height: 26px;
  font-size: 16px;
`;

const UpdateButton = styled.button`
  padding: 12px 20px;
  border-radius: 6px;
  border: none;
  background-color: orange;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  &:hover {
    opacity: 0.8;
  }
`;
