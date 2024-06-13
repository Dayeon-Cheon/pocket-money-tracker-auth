import axios from "axios";

const JSON_SERVER_HOST = "https://moneyfulpublicpolicy.co.kr";

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
