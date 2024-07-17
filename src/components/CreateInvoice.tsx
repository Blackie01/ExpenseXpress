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

interface InvoiceCreatorProps {
  openInvoiceCreator: boolean;
  setOpenInvoiceCreator: (value: boolean) => void;
}

const CreateInvoice = ({
  openInvoiceCreator,
  setOpenInvoiceCreator,
}: InvoiceCreatorProps) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [date, setDate] = useState<any>();

  const func = () => {};

  const handleDate = (value: string) => {
    setDate(value);
  };

  return (
    <Modal openModal={openInvoiceCreator} setOpenModal={setOpenInvoiceCreator}>
      <section className="flex flex-col gap-4 text-sm ">
        <section className="flex flex-col gap-2">
          <div className="mb-4">
            <h3 className="text-[20px] font-semibold">Invoice</h3>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[30%]">
              <CustomInput
                required={true}
                value={""}
                type="number"
                placeholder="Invoice No."
                onChange={func}
                noBorder={true}
              />
            </div>
            <div className="w-[48%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Your Company Name."
                onChange={func}
                noBorder={true}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-[48%] ">
              <DatePicker
                required={true}
                selectedDate={date}
                onChange={handleDate}
              />
            </div>
          </div>
        </section>
        <hr />
        <section className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="w-[20%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Bill to"
                onChange={func}
                noBorder={false}
              />
            </div>
            <div className="w-[80%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Mr. John Doe."
                onChange={func}
                noBorder={true}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[20%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Due date"
                onChange={func}
                noBorder={false}
              />
            </div>
            <div className="w-[80%]">
              <DatePicker
                required={true}
                selectedDate={date}
                onChange={handleDate}
              />
            </div>
          </div>
        </section>
        <hr />
        <section>
            
        </section>
        <hr />
        <section className="flex justify-between">
          <div className="w-[48%]">
            <div className="">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Note"
                onChange={func}
                noBorder={false}
              />
            </div>
            <textarea></textarea>
          </div>
          <div className="w-[48%]">
          <div className="flex justify-between">
            <div className="w-[40%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Subtotal:"
                onChange={func}
                noBorder={false}
              />
            </div>
            <div className="w-[60%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="0"
                onChange={func}
                noBorder={true}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[40%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Tax:"
                onChange={func}
                noBorder={false}
              />
            </div>
            <div className="w-[60%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="0"
                onChange={func}
                noBorder={true}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[40%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Shipping:"
                onChange={func}
                noBorder={false}
              />
            </div>
            <div className="w-[60%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="0"
                onChange={func}
                noBorder={true}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[40%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Total:"
                onChange={func}
                noBorder={false}
              />
            </div>
            <div className="w-[60%]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="0"
                onChange={func}
                noBorder={true}
              />
            </div>
          </div>
          </div>
        </section>
      </section>
    </Modal>
  );
};

export default CreateInvoice;
