import { createContext } from "react";
import { useState } from "react";
import fakeData from "../data/fakeData.js";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const savedMonth = localStorage.getItem("month");
    return savedMonth ? Number(savedMonth) : 1;
  });
  const [expenses, setExpenses] = useState(fakeData);

  return (
    <ExpenseContext.Provider
      value={{ selectedMonth, setSelectedMonth, expenses, setExpenses }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
