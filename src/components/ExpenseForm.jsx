import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/slices/expensesSlice";
import styled from "styled-components";

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const dateInputRef = useRef(null);
  const itemInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const handleSubmitExpense = (e) => {
    e.preventDefault();

    const date = dateInputRef.current.value;
    const item = itemInputRef.current.value;
    const amount = parseFloat(amountInputRef.current.value);
    const description = descriptionInputRef.current.value;

    if (
      !date.trim() ||
      !item.trim() ||
      !amountInputRef.current.value.trim() ||
      !description.trim()
    ) {
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

    const newExpense = {
      id: crypto.randomUUID(),
      date,
      item,
      amount,
      description,
    };

    dispatch(addExpense(newExpense));

    e.target.reset();
  };

  return (
    <InputFormSection>
      <form onSubmit={handleSubmitExpense}>
        <FormDiv>
          <ExpenseInput
            ref={dateInputRef}
            id="date"
            type="text"
            placeholder="날짜 (YYYY-MM-DD)"
          ></ExpenseInput>
          <ExpenseInput
            ref={itemInputRef}
            id="item"
            type="text"
            placeholder="지출 항목"
          ></ExpenseInput>
          <ExpenseInput
            ref={amountInputRef}
            id="amount"
            type="number"
            placeholder="지출 금액"
          ></ExpenseInput>
          <ExpenseInput
            ref={descriptionInputRef}
            name="description"
            id="description"
            type="text"
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
