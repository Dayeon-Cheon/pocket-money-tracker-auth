import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../redux/slices/expensesSlice";
import styled from "styled-components";

const MonthSelector = () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const selectedMonth = useSelector((state) => state.expenses.selectedMonth);

  const dispatch = useDispatch();
  const handleMonthChange = (month) => {
    dispatch(setSelectedMonth(month));
  };

  return (
    <MonthSelectingSection>
      <MonthButtonContainer>
        {months.map((month) => (
          <MonthButton
            key={month}
            $isSelected={selectedMonth === month}
            onClick={() => handleMonthChange(month)}
          >
            {month}월
          </MonthButton>
        ))}
      </MonthButtonContainer>
    </MonthSelectingSection>
  );
};

export default MonthSelector;

const MonthSelectingSection = styled.section`
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
`;

const MonthButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const MonthButton = styled.button`
  background-color: ${(props) => (props.$isSelected ? "orange" : "#e0e0e0")};
  border: none;
  border-radius: 6px;
  width: 60px;
  height: 40px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
