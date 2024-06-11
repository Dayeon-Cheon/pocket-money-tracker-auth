import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MonthlyExpenseOverview = () => {
  const selectedMonth = useSelector((state) => state.expenses.selectedMonth);
  const expenses = useSelector((state) => state.expenses.expenses);
  const filteredExpenses = expenses.filter(
    (expense) => parseInt(expense.date.substring(5, 7), 10) === selectedMonth
  );

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
