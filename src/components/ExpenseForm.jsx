import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getUserInfo } from "../api/auth";
import { postExpense } from "../api/expense";
import styled from "styled-components";

const ExpenseForm = () => {
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: userInfo = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["user"], queryFn: getUserInfo });

  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      navigate(0);
    },
  });

  const handleSubmitExpense = (e) => {
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

    const newExpense = {
      id: crypto.randomUUID(),
      date,
      item,
      amount: parsedAmount,
      description,
      userId: userInfo.id,
    };

    mutation.mutate(newExpense);

    setDate("");
    setItem("");
    setAmount("");
    setDescription("");
  };

  if (isLoading) {
    <div>로딩 중입니다.</div>;
  }

  if (error) {
    <div>에러가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  return (
    <InputFormSection>
      <form onSubmit={handleSubmitExpense}>
        <FormDiv>
          <ExpenseInput
            id="date"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="날짜 (YYYY-MM-DD)"
          ></ExpenseInput>
          <ExpenseInput
            id="item"
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="지출 항목"
          ></ExpenseInput>
          <ExpenseInput
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="지출 금액"
          ></ExpenseInput>
          <ExpenseInput
            name="description"
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="지출 내용"
          ></ExpenseInput>
          <SaveButton type="submit">저장</SaveButton>
        </FormDiv>
      </form>
    </InputFormSection>
  );
};

export default ExpenseForm;

const InputFormSection = styled.section`
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const FormDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const ExpenseInput = styled.input`
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 160px;
  height: 26px;
`;

const SaveButton = styled.button`
  border: none;
  border-radius: 6px;
  background-color: orange;
  width: 100px;
  cursor: pointer;
`;
