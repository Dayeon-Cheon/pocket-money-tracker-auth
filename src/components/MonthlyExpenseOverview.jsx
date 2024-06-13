import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../api/expense";
import styled from "styled-components";

const MonthlyExpenseOverview = () => {
  const selectedMonth = useSelector((state) => state.expenses.selectedMonth);

  const {
    data: expenses = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["expenses"], queryFn: getExpenses });

  const filteredExpenses = expenses
    ? expenses.filter(
        (expense) => parseInt(expense.date.split("-")[1], 10) === selectedMonth
      )
    : [];

  if (isLoading) {
    <div>로딩 중입니다.</div>;
  }

  if (error) {
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
                <ExpenseItemLink to={`/detail/${expense.id}`} state={expense}>
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
                </ExpenseItemLink>
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

const ExpenseItemLink = styled(Link)`
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
