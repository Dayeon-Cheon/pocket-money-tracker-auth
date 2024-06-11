import { createSlice } from "@reduxjs/toolkit";
import fakeData from "../../data/fakeData.js";

const getInitialState = () => {
  const savedMonth = localStorage.getItem("month");
  const initialMonth = savedMonth ? Number(savedMonth) : 1;
  const initialExpenses = fakeData;

  return {
    selectedMonth: initialMonth,
    expenses: initialExpenses,
  };
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: getInitialState(),
  reducers: {
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
      localStorage.setItem("month", action.payload);
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action) => {
      state.expenses = state.expenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const { setSelectedMonth, addExpense, updateExpense, removeExpense } =
  expensesSlice.actions;
export default expensesSlice.reducer;
