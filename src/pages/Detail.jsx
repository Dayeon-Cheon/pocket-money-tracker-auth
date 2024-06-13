import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getUserInfo } from "../api/auth";
import { getExpense, putExpense, deleteExpense } from "../api/expense";
import styled from "styled-components";

const Detail = () => {
  let { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: userInfo = [],
    userIsLoading,
    userError,
  } = useQuery({ queryKey: ["user"], queryFn: getUserInfo });

  const {
    data: selectedExpense,
    expenseIsLoading,
    expenseError,
  } = useQuery({ queryKey: ["expenses", id], queryFn: getExpense });

  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedExpense) {
      setDate(selectedExpense.date);
      setItem(selectedExpense.item);
      setAmount(String(selectedExpense.amount));
      setDescription(selectedExpense.description);
    }
  }, [selectedExpense]);

  const mutationEdit = useMutation({
    mutationFn: putExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      navigate("/");
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      navigate("/");
    },
  });

  const handleUpdateExpense = (e) => {
    e.preventDefault();

    if (!date.trim() || !item.trim() || !amount.trim() || !description.trim()) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(dateFormat)) {
      alert("날짜 형식이 올바르지 않습니다.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      alert("금액은 숫자만 입력해 주세요.");
      return;
    }

    const updatedExpense = {
      id,
      date,
      item,
      amount: parsedAmount,
      description,
      userId: userInfo.id,
    };

    mutationEdit.mutate(updatedExpense);
  };

  const handleDeleteExpense = () => {
    mutationDelete.mutate(id);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (userIsLoading || expenseIsLoading) {
    <div>로딩 중입니다.</div>;
  }

  if (userError || expenseError) {
    <div>에러가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  return (
    <InputFormSection>
      <FormDiv>
        <label htmlFor="date">날짜</label>
        <ExpenseInput
          id="date"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></ExpenseInput>
        <label htmlFor="item">항목</label>
        <ExpenseInput
          id="item"
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        ></ExpenseInput>
        <label htmlFor="amount">금액</label>
        <ExpenseInput
          id="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></ExpenseInput>
        <label htmlFor="description">내용</label>
        <ExpenseInput
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></ExpenseInput>
      </FormDiv>
      <ButtonDiv>
        <div>
          <StyledButton onClick={handleUpdateExpense} $variant="update">
            수정
          </StyledButton>
          <StyledButton onClick={handleDeleteExpense} $variant="delete">
            삭제
          </StyledButton>
        </div>
        <div>
          <StyledButton onClick={handleGoBack} $variant="back">
            뒤로 가기
          </StyledButton>
        </div>
      </ButtonDiv>
    </InputFormSection>
  );
};

export default Detail;

const InputFormSection = styled.section`
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExpenseInput = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 800px;
  height: 26px;
  font-size: 16px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: ${(props) => {
    if (props.$variant === "update") return "orange";
    if (props.$variant === "delete") return "#d40000";
    if (props.$variant === "back") return "#616161";
  }};
  &:hover {
    opacity: 0.8;
  }
  border: none;
  border-radius: 6px;
  width: 100px;
  height: 34px;
  color: white;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;
