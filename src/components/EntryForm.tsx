"use client";
import React, { useState, useRef } from "react";
import Modal from "./Modal";
import CustomInput from "./CustomInput";
import DatePicker from "./DatePicker";
import ActionButton from "./ActionButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setTransactionEntries } from "@/redux/transactionEntriesSlice";
import { setSnackBar } from "@/redux/snackBarSlice";

interface FormProps {
  openForm: boolean;
  setOpenForm: (value: boolean) => void;
}

const EntryForm = ({ openForm, setOpenForm }: FormProps) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [entryType, setEntryType] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<any>(
    entryType ? "Income" : "Utilities"
  );
  const [date, setDate] = useState<any>();
  const [amount, setAmount] = useState<number | null>();

  const handleEntryType = () => {
    setEntryType(!entryType);
    if (entryType == false) {
      setCategory("Income");
    } else {
      setCategory("Utilities");
    }
  };

  const handleDescription = (value: string) => {
    setDescription(value);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleDate = (value: string) => {
    setDate(value);
  };

  const handleAmount = (value: number) => {
    setAmount(value);
  };

  const generateCustomId = (): number => {
    return Math.floor(Math.random() * 1e9);
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setLoadingState(true);

    const dataToSend = {
      type: entryType,
      title: description,
      category: category,
      date: date,
      amount: amount,
    };

    const form = formRef.current;
    if (form) {
      if (form.checkValidity()) {
        try {
          const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`;
          const response = await axios.post(endpoint, dataToSend);
          if (response.status === 201) {
            const dataWithNewId = { ...response.data, cid: generateCustomId() };
            dispatch(setTransactionEntries(dataWithNewId));
            setLoadingState(false);
            setDescription("");
            setDate("");
            setAmount(0);
            setCategory("");
            dispatch(
              setSnackBar({
                message: "Transaction recorded successfully",
                status: true,
                display: true,
              })
            );
          }
        } catch (error: any) {
          if (error.code == "ERR_NETWORK") {
            dispatch(
              setSnackBar({
                message: "Network error. Check internet connection.",
                status: false,
                display: true,
              })
            );
          }
          dispatch(
            setSnackBar({
              message: "There seems to be an error. Please try again.",
              status: false,
              display: true,
            })
          );
        } finally {
          setLoadingState(false);
        }
      } else {
        form.reportValidity();
        setLoadingState(false);
      }
    }
  };

  return (
    <Modal openModal={openForm} setOpenModal={setOpenForm}>
      <section className="flex flex-col gap-8 text-sm">
        <div>
          <h3 className="text-[20px] font-semibold">
            {entryType ? "Income entry" : "Expense entry"}
          </h3>
        </div>
        <div className="flex w-full">
          <div
            onClick={handleEntryType}
            className={`${
              entryType ? "bg-black text-white" : "bg-[#ebe8eb] text-black"
            } rounded-custom rounded-r-none py-2 px-4 transition-all duration-300 ease-in-out w-[50%] text-center`}
          >
            Income
          </div>
          <div
            onClick={handleEntryType}
            className={`${
              entryType ? "bg-[#ebe8eb] text-black " : "bg-black text-white"
            } rounded-custom rounded-l-none py-2 px-4 transition-all duration-300 ease-in-out w-[50%] text-center`}
          >
            Expense
          </div>
        </div>
        <form ref={formRef} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label>Description</label>
            <CustomInput
              required={true}
              value={description}
              type="text"
              placeholder={`Give your ${
                entryType ? "income" : "expense"
              } a description`}
              onChange={handleDescription}
              noBorder={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Category</label>
            <select
              onChange={handleCategory}
              className="border border-[#ebe8eb] rounded-custom h-[40px] px-2 w-full text-sm focus:outline-none"
              //   value={category || (entryType ? 'Income' : "Utilities")}
            >
              {!entryType && (
                <>
                  <option value="Utilities">Utilities</option>
                  <option value="Payments">Payments</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Marketing">Marketing</option>
                </>
              )}

              {entryType ? <option value="Income">Income</option> : ""}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>Date</label>
            <DatePicker
              required={true}
              selectedDate={date}
              onChange={handleDate}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Amount (₦)</label>
            <CustomInput
              required={true}
              value={amount}
              type="number"
              placeholder="Give entry a description"
              onChange={handleAmount}
              noBorder={true}
            />
          </div>
          <ActionButton
            text="Add transaction"
            bgColor="black"
            onClick={handleSave}
            width="w-full"
            loading={loadingState}
          />
        </form>
      </section>
    </Modal>
  );
};

export default EntryForm;
