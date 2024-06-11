import ExpenseForm from "../components/ExpenseForm";
import MonthSelector from "../components/MonthSelector";
import MonthlyExpenseOverview from "../components/MonthlyExpenseOverview";

function Home() {
  return (
    <>
      <ExpenseForm />
      <MonthSelector />
      <MonthlyExpenseOverview />
    </>
  );
}

export default Home;
