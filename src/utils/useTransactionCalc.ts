"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useTransactionCalculations = () => {
  const allTransactions = useSelector(
    (state: RootState) => state.transactionEntries.entries
  );
  const allIncome = allTransactions.filter((item) => item.type === true);
  const allExpense = allTransactions.filter((item) => item.type === false);

  const calcTotalIncome = () => {
    return allIncome.reduce((sum, item) => sum + Number(item.amount), 0);
  };

  const calcTotalExpense = () => {
    return allExpense.reduce((sum, item) => sum + Number(item.amount), 0);
  };

  const calcPercentageOfCategory = (category: string) => {
    const allUtilities = allExpense.filter(
      (item) => item.category === category
    );
    const totalOfUtilities = allUtilities.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );
    const totalExpenses = calcTotalExpense();
    const percentage = (totalOfUtilities / totalExpenses) * 100;
    if (totalExpenses === 0) {
      return 0;
    }
    return Number(percentage.toFixed(1));
  };

  return {
    allIncome,
    allExpense,
    calcTotalIncome,
    calcTotalExpense,
    calcPercentageOfCategory,
  };
};
