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
        <h3 className="lg:text-[24px] text-[16px] text-black text-opacity-50">
          Your Balance
        </h3>
        <h3 className="font-semibold lg:text-[35px] text-[20px]">
          ₦{balance || 0}
        </h3>
      </div>

      <div className="flex gap-8 mt-8 mb-12 max-[573px]:gap-4 max-[372px]:flex-col">
        {cardContent.map((item, index) => (
          <div
            key={index}
            className={`py-8 px-16  rounded-custom max-[573px]:px-[1rem]  max-[414px]:w-[50%] max-[395px]:text-sm max-[372px]:w-[100%] max-[372px]:py-4 ${
              item.for === "Income"
                ? "bg-black text-white max-[573px]:w-[45%]  "
                : "bg-white text-black border border-[#ebe8eb] max-[573px]:w-[55%]"
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
        <div className="w-full flex justify-between items-center mb-8">
          <h3 className="font-semibold text-[20px] max-[555px]:text-[16px] text-black text-opacity-75">
            Recent Transactions
          </h3>
          <div className="block max-[450px]:hidden">
            <ActionButton
              text="Add transaction"
              bgColor="black"
              onClick={handleNewEntry}
            />
          </div>
          <div className="hidden max-[450px]:block">
            <ActionButton text="Add" bgColor="black" onClick={handleNewEntry} />
          </div>
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
