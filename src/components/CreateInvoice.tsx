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
import Loading from "./Loading";

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
  const [loading, setLoading] = useState<boolean>(false);

  const func = () => {};

  const handleDate = (value: string) => {
    setDate(value);
  };

  return (
    <Modal openModal={openInvoiceCreator} setOpenModal={setOpenInvoiceCreator}>
      <form className="flex flex-col gap-4 text-sm ">
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
          <div className="flex justify-between bg-[#FAF9FA] px-2 py-2 border border-black">
            <div className="w-[50%] ">Item</div>
            <div className="w-[10%] text-center">Q</div>
            <div className="w-[20%] text-center">Rate (₦)</div>
            <div className="w-[20%] text-center">Amount (₦)</div>
          </div>
          <div className="flex justify-between">
            <div className="w-[50%] border border-[#e6e3e6]">
              <CustomInput
                required={true}
                value={""}
                type="text"
                placeholder="Description of item"
                onChange={func}
                noBorder={false}
              />
            </div>
            <div className="w-[10%] border border-[#e6e3e6]">
              <CustomInput
                required={true}
                value={""}
                type="number"
                placeholder=""
                onChange={func}
                noBorder={false}
              />
            </div>
            <div className="w-[20%] border border-[#e6e3e6]">
              <CustomInput
                required={true}
                value={""}
                type="number"
                placeholder=""
                onChange={func}
                noBorder={false}
              />
            </div>
            <div className="w-[20%] border border-[#e6e3e6]">
              <CustomInput
                required={true}
                value={""}
                type="number"
                placeholder=""
                onChange={func}
                noBorder={false}
              />
            </div>
          </div>
        </section>
        <hr />
        <section className="flex justify-between">
          <div className="w-[48%]">
            <div className="">Note:</div>
            <textarea></textarea>
          </div>
          <div className="w-[48%] flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="w-[40%]">Subtotal:</div>
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
            <div className="flex justify-between items-center">
              <div className="w-[40%]">Tax:</div>
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
            <div className="flex justify-between items-center">
              <div className="w-[40%]">Shipping:</div>
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
            <div className="flex justify-between items-center">
              <div className="w-[40%]">Total:</div>
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
        <div className="w-full mt-4">
          <button
            //   onClick={onClick}
            className={`bg-black text-white rounded-custom py-2 px-4 text-sm w-full h-max flex items-center justify-center cursor-pointer`}
          >
            {loading ? (
              <Loading width={"1.25rem"} height={"1.25rem"} />
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateInvoice;
