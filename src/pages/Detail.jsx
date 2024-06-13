import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getExpense } from "../api/expense";
import styled from "styled-components";

const Detail = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const {
    data: selectedExpense,
    isLoading,
    error,
  } = useQuery({ queryKey: ["expenses", id], queryFn: getExpense });

  const dateInputRef = useRef(selectedExpense.date);
  const itemInputRef = useRef(selectedExpense.item);
  const amountInputRef = useRef(selectedExpense.amount);
  const descriptionInputRef = useRef(selectedExpense.description);

  const handleUpdateExpense = (e) => {
    e.preventDefault();

    const date = dateInputRef.current.value;
    const item = itemInputRef.current.value;
    const amount = amountInputRef.current.value;
    const description = descriptionInputRef.current.value;

    if (!date.trim() || !item.trim() || !amount.trim() || !description.trim()) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(dateFormat)) {
      alert("날짜 형식이 올바르지 않습니다.");
      return;
    }

    if (isNaN(amount)) {
      alert("금액은 숫자만 입력해 주세요.");
      return;
    }

    const updatedExpense = {
      id: expense.id,
      date,
      item,
      amount,
      description,
    };

    // dispatch(updateExpense(updatedExpense));

    navigate(-1);
  };

  const handleDeleteExpense = () => {
    // dispatch(removeExpense(expense.id));

    navigate(-1);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    <div>로딩 중입니다.</div>;
  }

  if (error) {
    <div>에러가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  return (
    <InputFormSection>
      <FormDiv>
        <label htmlFor="date">날짜</label>
        <ExpenseInput
          ref={dateInputRef}
          id="date"
          type="text"
          defaultValue={selectedExpense.date}
        ></ExpenseInput>
        <label htmlFor="item">항목</label>
        <ExpenseInput
          ref={itemInputRef}
          id="item"
          type="text"
          defaultValue={selectedExpense.item}
        ></ExpenseInput>
        <label htmlFor="amount">금액</label>
        <ExpenseInput
          ref={amountInputRef}
          id="amount"
          type="text"
          defaultValue={selectedExpense.amount}
        ></ExpenseInput>
        <label htmlFor="description">내용</label>
        <ExpenseInput
          ref={descriptionInputRef}
          id="description"
          type="text"
          defaultValue={selectedExpense.description}
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
