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

  // useEffect(() => {
  //   const newData = sliceCount
  //     ? [...dataReceived].slice(-sliceCount).reverse()
  //     : [...dataReceived].reverse();
  //   setData(newData);
  // }, [dataReceived, filterByType === null]);

  useEffect(() => {
    const newData = sliceCount
      ? [...dataReceived].slice(-sliceCount).reverse()
      : [...dataReceived].reverse();
    setData(newData);
  }, [sliceCount]);

  useEffect(() => {
    if (filterByType === true) {
      const reversedAllIncome = [...allIncome].reverse();
      setData(reversedAllIncome);
    } else if (filterByType === false) {
      const reversedAllExpense = [...allExpense].reverse();
      setData(reversedAllExpense);
    } else {
      setData([...dataReceived].reverse());
    }
  }, [filterByType, sliceCount]);

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
        data?.map((item, index) => (
          <div
            key={index}
            className="max-[872px]:flex-wrap max-[460px]:flex-col max-[872px] max-[872px]:gap-y-2 flex justify-between min-[461px]:items-center text-sm py-2 px-4 rounded-custom hover:border-black border border-white max-[872px]:border-[#ebe8eb] transition-all duration-200 ease-in-out"
          >
            <div className="min-[873px]:w-[40%] max-[872px]:w-[60%]  text-left flex items-center gap-4 max-[460px]:w-[100%]">
              <div className="w-max h-max">
                <div
                  data-testid="indicator"
                  className={`h-[9.6px] w-[9.6px] ${
                    item.type ? "bg-[green]" : "bg-[red]"
                  } rounded-[50%]`}
                ></div>
              </div>

              {item.title}
            </div>
            <p className="min-[873px]:w-[10%] max-[872px]:w-[30%] text-opacity-50 text-black max-[872px]:text-right max-[460px]:w-[100%] max-[460px]:text-left max-[460px]:pl-[1.6rem]">
              {item.category}
            </p>
            <p className="min-[873px]:w-[15%] max-[872px]:w-[60%] pl-[1.6rem] max-[460px]:w-[100%]">
              {item.date}
            </p>
            <div
              data-testid="amountParent"
              className=" min-[873px]:w-[17%] max-[872px]:w-[30%]  flex font-semibold max-[872px]:justify-end max-[460px]:w-[100%] max-[460px]:justify-start max-[460px]:pl-[1.6rem] max-[460px]:text-opacity-50 text-black"
            >
              <p className="w-[1rem]">{item.type ? "+" : "-"}</p>
              <p>
                <span>₦</span>
                <span>{item.amount}</span>
              </p>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Transactions;
