import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Transactions from "../../src/components/Transactions";
import "@testing-library/jest-dom";

jest.mock("../../src/utils/useTransactionCalc", () => ({
  useTransactionCalculations: () => ({
    allIncome: [
      {
        id: 1,
        type: true,
        title: "Salary",
        category: "Income",
        date: "2023-07-01",
        amount: 5000,
      },
    ],
    allExpense: [
      {
        id: 2,
        type: false,
        title: "Rent",
        category: "Housing",
        date: "2023-07-05",
        amount: 1000,
      },
      {
        id: 3,
        type: false,
        title: "Groceries",
        category: "Food",
        date: "2023-07-10",
        amount: 200,
      },
    ],
  }),
}));

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: number;
  type: boolean;
  title: string;
  category: string;
  date: string;
  amount: number;
}

interface TransactionState {
  entries: Transaction[];
}

const initialState: TransactionState = {
  entries: [],
};

const transactionSlice = createSlice({
  name: "transactionEntries",
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<Transaction[]>) => {
      state.entries = action.payload;
    },
  },
});

describe("Transactions Component", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        transactionEntries: transactionSlice.reducer,
      },
    });

    store.dispatch(
      transactionSlice.actions.setEntries([
        {
          id: 1,
          type: true,
          title: "Salary",
          category: "Income",
          date: "2023-07-01",
          amount: 5000,
        },
        {
          id: 2,
          type: false,
          title: "Rent",
          category: "Housing",
          date: "2023-07-05",
          amount: 1000,
        },
        {
          id: 3,
          type: false,
          title: "Groceries",
          category: "Food",
          date: "2023-07-10",
          amount: 200,
        },
      ])
    );
  });

  test("renders all transactions when no filters are applied", () => {
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );

    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
  });

//   test("slices transactions correctly", () => {
//     render(
//       <Provider store={store}>
//         <Transactions sliceCount={1} filterByType={null}/>
//       </Provider>
//     );

//     expect(screen.getByText("Groceries")).toBeInTheDocument();
//     expect(screen.getByText("Rent")).toBeInTheDocument();
//     expect(screen.queryByText("Salary")).not.toBeInTheDocument();
//   });

//   test.only("filters transactions by type (income)", () => {
//     render(
//       <Provider store={store}>
//         <Transactions filterByType={true} />
//       </Provider>
//     );

//     expect(screen.getByText("Salary")).toBeInTheDocument();
//     expect(screen.queryByText("Rent")).not.toBeInTheDocument();
//     expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
//   });

//   test("filters transactions by type (expense)", () => {
//     render(
//       <Provider store={store}>
//         <Transactions filterByType={false} />
//       </Provider>
//     );

//     expect(screen.getByText("Salary")).not.toBeInTheDocument();
//     expect(screen.getByText("Rent")).toBeInTheDocument();
//     expect(screen.getByText("Groceries")).toBeInTheDocument();
//   });

  test("filters transactions by category", () => {
    render(
      <Provider store={store}>
        <Transactions filterByCategory="Housing" />
      </Provider>
    );

    expect(screen.queryByText("Salary")).not.toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();
    expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
  });

  test("displays correct transaction details", () => {
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );

    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("2023-07-01")).toBeInTheDocument();
  });

  test("applies correct styles for income and expense", () => {
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );

    const incomeIndicator = screen.getAllByTestId("indicator")[2];
    const expenseIndicator = screen.getAllByTestId("indicator")[0];

    expect(incomeIndicator).toHaveClass("bg-[green]");
    expect(expenseIndicator).toHaveClass("bg-[red]");
  });
});
