"use client";
import ActionButton from "@/components/ActionButton";
import EmptyTransactionsState from "@/components/EmptyTransactionsState";
import EntryForm from "@/components/EntryForm";
import Transactions from "@/components/Transactions";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTransactionCalculations } from "@/utils/useTransactionCalc";

interface CardContentProps {
  for: string;
  value: number;
  color: Boolean;
}

const Dashboard: React.FC = () => {
  const { calcTotalIncome, calcTotalExpense } = useTransactionCalculations();
  const balance = calcTotalIncome() - calcTotalExpense();

  const cardContent: CardContentProps[] = [
    {
      for: "Income",
      value: calcTotalIncome(),
      color: true,
    },
    {
      for: "Expense",
      value: calcTotalExpense(),
      color: false,
    },
  ];

  const countTransactionEntries: number = useSelector(
    (state: RootState) => state.transactionEntries.entries.length
  );
  const [openEntryForm, setOpenEntryForm] = useState<boolean>(false);

  const handleNewEntry = () => {
    setOpenEntryForm(!openEntryForm);
  };
  return (
    <section className="h-full">
      <div>
        <h3 className="text-[24px] text-black text-opacity-50">Your Balance</h3>
        <h3 className="font-semibold text-[40px] text-opacity-50">
          ₦{balance || 0}
        </h3>
      </div>

      <div className="flex gap-8 mt-8 mb-12">
        {cardContent.map((item, index) => (
          <div
            key={index}
            className={` py-8 px-16 rounded-custom  ${
              item.for === "Income"
                ? "bg-black text-white"
                : "bg-white text-black border border-[#ebe8eb]"
            }`}
          >
            <p
              className={`text-left ${
                item.color ? "text-[green]" : "text-[red]"
              }`}
            >
              {item.for}
            </p>
            <p>₦{item.value || 0}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className="mt-12 w-full min-h-[50%] border border-[#ebe8eb] rounded-custom flex flex-col p-4">
        <div className="w-full flex justify-between mb-8">
          <h3 className="font-semibold text-[20px] text-black text-opacity-75">
            Recent Transactions
          </h3>
          <ActionButton
            text="Add transaction"
            bgColor="black"
            onClick={handleNewEntry}
          />
        </div>
        {countTransactionEntries > 0 ? (
          <Transactions sliceCount={5} />
        ) : (
          <EmptyTransactionsState />
        )}
      </div>

      <EntryForm openForm={openEntryForm} setOpenForm={setOpenEntryForm} />
    </section>
  );
};

export default Dashboard;
