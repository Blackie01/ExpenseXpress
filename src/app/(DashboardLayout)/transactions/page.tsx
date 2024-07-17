"use client";
import InfoCard from "@/components/InfoCard";
import React, { useState } from "react";
import ActionButton from "@/components/ActionButton";
import Transactions from "@/components/Transactions";
import EmptyTransactionsState from "@/components/EmptyTransactionsState";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import EntryForm from "@/components/EntryForm";
import { useTransactionCalculations } from "@/utils/useTransactionCalc";

const TransactionsPage: React.FC = () => {
  const { calcPercentageOfCategory } = useTransactionCalculations();

  const expenseSummary = [
    {
      percentage: calcPercentageOfCategory("Utilities"),
      memo: "of your expense was on utilities",
    },
    {
      percentage: calcPercentageOfCategory("Payments"),
      memo: "of your expense was on payments",
    },
    {
      percentage: calcPercentageOfCategory("Inventory"),
      memo: "of your expense was on inventory",
    },
    {
      percentage: calcPercentageOfCategory("Marketing"),
      memo: "of your expense was on marketing",
    },
  ];

  const countTransactionEntries: number = useSelector(
    (state: RootState) => state.transactionEntries.entries.length
  );

  const [openEntryForm, setOpenEntryForm] = useState<boolean>(false);
  const [tableTitle, setTableTitle] = useState<string>("All Transactions");
  const [entryType, setEntryType] = useState<string>("all");
  const [filterByType, setFilterByType] = useState<boolean | null>();
  const [sortByCategory, setSortByCategory] = useState<string | null>(null);

  const selectedClass = "bg-black text-white";
  const unselectedClass = "bg-[#ebe8eb] text-black";

  const handleNewEntry = () => {
    setOpenEntryForm(!openEntryForm);
  };

  const handleViewAll = () => {
    setEntryType("all");
    setTableTitle("All Transactions");
    setFilterByType(null);
  };

  const handleViewIncome = () => {
    setEntryType("income");
    setTableTitle("Incoming Transactions");
    setFilterByType(true);
  };

  const handleViewExpense = () => {
    setEntryType("expense");
    setTableTitle("Outgoing Transactions");
    setFilterByType(false);
  };

  const handleSortByCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortByCategory(e.target.value);
  };

  return (
    <section>
      <h3 className="text-[24px] text-black">Transactions</h3>
      <div className="flex gap-2 mt-8 mb-12">
        {expenseSummary &&
          expenseSummary.map((demo, index) => (
            <div key={index}>
              <InfoCard percentage={demo.percentage} memo={demo.memo} />
            </div>
          ))}
      </div>
      <hr />
      <div className="mt-12 flex justify-between items-center">
        <div className="flex text-sm">
          <div
            onClick={handleViewAll}
            className={`${
              entryType === "all" ? selectedClass : unselectedClass
            } rounded-custom rounded-r-none py-2 px-4 transition-all duration-300 ease-in-out w-[50%] text-center cursor-pointer`}
          >
            All
          </div>
          <div
            onClick={handleViewIncome}
            className={`${
              entryType === "income" ? selectedClass : unselectedClass
            }  py-2 px-4 transition-all duration-300 ease-in-out w-[50%] text-center cursor-pointer`}
          >
            Income
          </div>
          <div
            onClick={handleViewExpense}
            className={`${
              entryType === "expense" ? selectedClass : unselectedClass
            } rounded-custom rounded-l-none py-2 px-4 transition-all duration-300 ease-in-out w-[50%] text-center cursor-pointer`}
          >
            Expense
          </div>
        </div>
        <div>
          <select
            onChange={handleSortByCategory}
            className="text-sm focus:outline-none"
          >
            <option disabled selected>
              Sort by category
            </option>
            <option value="Utilities">Utilities</option>
            <option value="Payments">Payments</option>
            <option value="Inventory">Inventory</option>
            <option value="Marketing">Marketing</option>
            <option value="Income">Income</option>
          </select>
        </div>
      </div>
      <div className="mt-4 w-full min-h-[50%] border border-[#ebe8eb] rounded-custom flex flex-col p-4">
        <div className="w-full flex justify-between mb-8">
          <h3 className="font-semibold text-[20px] text-black text-opacity-75">
            {tableTitle}
          </h3>
          <ActionButton
            text="Add transaction"
            bgColor="black"
            onClick={handleNewEntry}
          />
        </div>
        {countTransactionEntries > 0 ? (
          <Transactions
            filterByType={filterByType}
            filterByCategory={sortByCategory}
          />
        ) : (
          <EmptyTransactionsState />
        )}
      </div>
      <EntryForm openForm={openEntryForm} setOpenForm={setOpenEntryForm} />
    </section>
  );
};

export default TransactionsPage;
