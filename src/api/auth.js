import axios from "axios";

const JSON_SERVER_HOST = "https://moneyfulpublicpolicy.co.kr";

// 회원가입
export const join = async ({ id, password, nickname }) => {
  try {
    const response = await axios.post(`${JSON_SERVER_HOST}/register`, {
      id,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 로그인한 유저 데이터 받아오기
export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${JSON_SERVER_HOST}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 유저 프로필 업데이트
export const updateProfile = async (formData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(
      `${JSON_SERVER_HOST}/profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
