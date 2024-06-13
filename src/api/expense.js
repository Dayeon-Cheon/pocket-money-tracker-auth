import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:4000";

// 전체 지출 데이터 받아오기
export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 특정 지출 데이터 받아오기
export const getExpense = async ({ queryKey }) => {
  try {
    const response = await axios.get(
      `${JSON_SERVER_HOST}/expenses/${queryKey[1]}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 지출 데이터 등록하기
export const postExpense = async (newExpense) => {
  try {
    const response = await axios.post(
      `${JSON_SERVER_HOST}/expenses`,
      newExpense
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
