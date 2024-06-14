import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/auth";
import { getExpenses } from "../api/expense";
import styled from "styled-components";

const MonthlyExpenseOverview = () => {
  const selectedMonth = useSelector((state) => state.expenses.selectedMonth);
  const navigate = useNavigate();

  const {
    data: userInfo = [],
    userIsLoading,
    userError,
  } = useQuery({ queryKey: ["user"], queryFn: getUserInfo });

  const {
    data: expenses = [],
    expensesIsLoading,
    expensesError,
  } = useQuery({ queryKey: ["expenses"], queryFn: getExpenses });

  const filteredExpenses = expenses
    ? expenses.filter(
        (expense) => parseInt(expense.date.split("-")[1], 10) === selectedMonth
      )
    : [];

  const handleClick = (expense) => {
    if (expense.userId !== userInfo.id) {
      alert("본인이 작성한 지출에만 접근할 수 있습니다.");
    } else {
      navigate(`/detail/${expense.id}`, { state: expense });
    }
  };

  if (userIsLoading || expensesIsLoading) {
    <div>로딩 중입니다.</div>;
  }

  if (userError || expensesError) {
    <div>에러가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  return (
    <ExpenseListSection>
      <div>
        <ul>
          {filteredExpenses.length == 0 ? (
            <NoExpenseMessageDiv>
              지출 내역이 존재하지 않습니다.
            </NoExpenseMessageDiv>
          ) : (
            filteredExpenses.map((expense) => (
              <ExpenseListItem key={expense.id}>
                <ExpenseItemDiv onClick={() => handleClick(expense)}>
                  <ExpenseLeftDiv>
                    <ExpenseDateSpan>{expense.date}</ExpenseDateSpan>
                    <ExpenseContentSpan>
                      {expense.item}
                      &nbsp;:&nbsp;
                      {expense.description.length > 50
                        ? expense.description.slice(0, 47) + "..."
                        : expense.description}
                      &nbsp;(by {expense.userId})
                    </ExpenseContentSpan>
                  </ExpenseLeftDiv>
                  <ExpenseRightDiv>
                    {expense.amount.toLocaleString()}&nbsp;원
                  </ExpenseRightDiv>
                </ExpenseItemDiv>
              </ExpenseListItem>
            ))
          )}
        </ul>
      </div>
    </ExpenseListSection>
  );
};

export default MonthlyExpenseOverview;

const ExpenseListSection = styled.section`
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
`;

const NoExpenseMessageDiv = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

const ExpenseListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const ExpenseItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 6px;
  background-color: #f6f7f7;
  text-decoration-line: none;
  color: black;
  &:hover {
    background-color: orange;
  }
`;

const ExpenseLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExpenseDateSpan = styled.span`
  font-size: 14px;
`;

const ExpenseContentSpan = styled.span`
  font-weight: bold;
`;

const ExpenseRightDiv = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;
