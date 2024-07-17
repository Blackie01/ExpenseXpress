import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTransactionCalculations } from "@/utils/useTransactionCalc";

interface DataProps {
  cid: number;
  id: number;
  type: boolean;
  title: string;
  category: string;
  date: string;
  amount: number;
}

interface SliceProp {
  sliceCount?: number;
  filterByType?: boolean | null;
  filterByCategory?: string | null;
}

const Transactions: React.FC<SliceProp> = ({
  sliceCount,
  filterByType,
  filterByCategory,
}) => {
  const { allIncome, allExpense } = useTransactionCalculations();

  const dataReceived: DataProps[] = useSelector(
    (state: RootState) => state.transactionEntries.entries
  );

  const [data, setData] = useState<DataProps[]>();

  useEffect(() => {
    const newData = sliceCount
      ? [...dataReceived].slice(-sliceCount).reverse()
      : [...dataReceived].reverse();
    setData(newData);
  }, [dataReceived, filterByType === null]);

  useEffect(() => {
    const newData = sliceCount
      ? [...dataReceived].slice(-sliceCount).reverse()
      : [...dataReceived].reverse();
    setData(newData);
  }, [ sliceCount]);

  useEffect(() => {
    if (filterByType === true) {
      const reversedAllIncome = [...allIncome].reverse();
      setData(reversedAllIncome);
    } else if (filterByType === false) {
      const reversedAllExpense = [...allExpense].reverse();
      setData(reversedAllExpense);
    }
  }, [filterByType]);

  useEffect(() => {
    const filterByCategoryFunc = (
      filterByCategory: string | undefined | null
    ) => {
      if (filterByCategory) {
        const categorizedData = dataReceived.filter(
          (item) => item.category === filterByCategory
        );
        const reversedCategorizedData = [...categorizedData].reverse();
        setData(reversedCategorizedData);
      } else {
        const newData = [...dataReceived].reverse();
        setData(newData);
      }
    };
    filterByCategoryFunc(filterByCategory);
  }, [filterByCategory]);

  return (
    <section className="flex flex-col gap-2">
      {data &&
        data?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm py-2 px-4 rounded-custom hover:border-black border border-white transition-all duration-200 ease-in-out"
          >
            <div
              className={`h-[10px] w-[10px] ${
                item.type ? "bg-[green]" : "bg-[red]"
              } rounded-[50%]`}
            ></div>
            <p className="w-[40%] text-left">{item.title}</p>
            <p className="w-[20%] text-opacity-50 text-black">
              {item.category}
            </p>
            <p className="w-[20%]">{item.date}</p>
            <div className="w-[12%] flex font-semibold">
              <p className="w-[1rem]">{item.type ? "+" : "-"}</p>
              <p>{item.amount}</p>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Transactions;
