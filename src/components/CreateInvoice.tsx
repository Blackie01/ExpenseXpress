"use client";
import React, { useState, useRef, useEffect } from "react";
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
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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

  const [loading, setLoading] = useState<boolean>(false);

  const [invoiceNo, setInvoiceNo] = useState<number>();
  const [companyName, setCompanyName] = useState<string>();
  const [date, setDate] = useState<any>();
  const [billTo, setBillTo] = useState<string>();
  const [dueDate, setDueDate] = useState<any>();
  const [description, setDescription] = useState<string>();
  const [quantity, setQuantity] = useState<number>();
  const [rate, setRate] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const [note, setNote] = useState<string>();
  const [subtotal, setSubtotal] = useState<number>();
  const [tax, setTax] = useState<number>();
  const [shipping, setShipping] = useState<number>();
  const [total, setTotal] = useState<number>();

  const handleInvoiceNo = (value: number) => {
    setInvoiceNo(value);
  };

  const handleCompanyName = (value: string) => {
    setCompanyName(value);
  };

  const handleDate = (value: string) => {
    setDate(value);
  };

  const handleBillTo = (value: string) => {
    setBillTo(value);
  };

  const handleDueDate = (value: string) => {
    setDate(value);
  };

  const handleDescription = (value: string) => {
    setDescription(value);
  };

  const handleQuantity = (value: number) => {
    setQuantity(value);
  };

  const handleRate = (value: number) => {
    setRate(value);
  };

  useEffect(() => {
    const calcAmount = () => {
      const quantityValue = Number(quantity) || 1;
      const multipliedAmount = quantityValue * Number(rate);
      setAmount(multipliedAmount);
      setSubtotal(multipliedAmount);
    };
    calcAmount();
  }, [rate, quantity]);

  const handleAmount = (value: number) => {
    setAmount(value);
  };

  const handleNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSubtotal = (value: number) => {
    setSubtotal(value);
  };

  const handleTax = (value: number) => {
    setTax(value);
  };

  const handleShipping = (value: number) => {
    setShipping(value);
  };

  const handleTotal = (value: number) => {
    setTotal(value);
  };

  useEffect(() => {
    const calculateGrandTotal = () => {
      const subtotalValue = Number(subtotal) || 0;
      const shippingValue = Number(shipping) || 0;
      const taxValue = Number(tax) || 0;

      const grandTotal = subtotalValue + shippingValue + taxValue;
      setTotal(grandTotal);
    };

    calculateGrandTotal();
  }, [subtotal, shipping, tax]);

  const handleGenerateInvoice = (e: any) => {
    e.preventDefault();
    const targetElement: any = document.getElementById("target");
    const pdf = new jsPDF("portrait");

    setLoading(true);
    try {
      html2canvas(targetElement, { scale: 1 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png", 0.7);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const desiredWidth = pageWidth * 0.5;
        const desiredHeight = pageHeight * 0.5;

        const x = (pageWidth - desiredWidth) / 2;
        const y = (pageHeight - desiredHeight) / 2;

        pdf.addImage(imgData, "PNG", x, y, desiredWidth, desiredHeight);
        pdf.save(`Invoice-to-${billTo}-from-${companyName}.pdf`);
      });
      dispatch(
        setSnackBar({
          message: "Invoice generated and downloaded",
          status: true,
          display: true,
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(
        setSnackBar({
          message: "Error generating invoice",
          status: false,
          display: true,
        })
      );
    }
  };

  return (
    <Modal openModal={openInvoiceCreator} setOpenModal={setOpenInvoiceCreator}>
      <form>
        <section id="target" className="flex flex-col gap-4 text-sm ">
          <section className="flex flex-col gap-2">
            <div className="mb-4">
              <h3 className="text-[20px] font-semibold">Invoice</h3>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-[30%] border-b border-[#e6e3e6]">
                <CustomInput
                  required={true}
                  value={invoiceNo}
                  type="number"
                  placeholder="Invoice No."
                  onChange={handleInvoiceNo}
                  noBorder={false}
                />
              </div>
              <div className="w-[48%] border-b border-[#e6e3e6]">
                <CustomInput
                  required={true}
                  value={companyName}
                  type="text"
                  placeholder="Your Company Name."
                  onChange={handleCompanyName}
                  noBorder={false}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-[48%] border-b border-[#e6e3e6]">
                <DatePicker
                  required={true}
                  selectedDate={date}
                  onChange={handleDate}
                  noBorder={false}
                />
              </div>
            </div>
          </section>
          <hr />
          <section className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="w-[20%]">Bill to:</div>
              <div className="w-[80%] border-b border-[#e6e3e6]">
                <CustomInput
                  required={true}
                  value={billTo}
                  type="text"
                  placeholder="Mr. John Doe."
                  onChange={handleBillTo}
                  noBorder={false}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-[20%]">Due date:</div>
              <div className="w-[80%] border-b border-[#e6e3e6]">
                <DatePicker
                  required={true}
                  selectedDate={dueDate}
                  onChange={handleDueDate}
                  noBorder={false}
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
              <div className="w-[50%] border-b border-[#e6e3e6]">
                <CustomInput
                  required={true}
                  value={description}
                  type="text"
                  placeholder="Description of item"
                  onChange={handleDescription}
                  noBorder={false}
                />
              </div>
              <div className="w-[10%] border-b border-[#e6e3e6]">
                <CustomInput
                  required={true}
                  value={quantity}
                  type="number"
                  placeholder=""
                  onChange={handleQuantity}
                  noBorder={false}
                />
              </div>
              <div className="w-[20%] border-b border-[#e6e3e6]">
                <CustomInput
                  required={true}
                  value={rate}
                  type="number"
                  placeholder=""
                  onChange={handleRate}
                  noBorder={false}
                />
              </div>
              <div className="w-[20%] border-b border-[#e6e3e6]">
                <CustomInput
                  required={true}
                  value={amount}
                  type="number"
                  placeholder=""
                  onChange={handleAmount}
                  noBorder={false}
                />
              </div>
            </div>
          </section>
          <hr />
          <section className="flex justify-between max-[530px]:flex-col">
            <div className="w-[48%] max-[530px]:w-full">
              <div className="">Note:</div>
              <textarea
                placeholder="Write here"
                value={note}
                onChange={handleNote}
                className="mt-4 border-b border-[#e6e3e6 text-sm focus:outline-none"
                rows={5}
                cols={25}
              ></textarea>
            </div>
            <div className="w-[48%] max-[530px]:w-full flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="w-[40%] flex justify-between">
                  <span>Subtotal:</span>
                  <span>₦</span>
                </div>
                <div className="w-[60%] border-b border-[#e6e3e6]">
                  <CustomInput
                    required={true}
                    value={subtotal}
                    type="number"
                    placeholder="0"
                    onChange={handleSubtotal}
                    noBorder={false}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-[40%] flex justify-between">
                  <span>Tax:</span>
                  <span>₦</span>
                </div>
                <div className="w-[60%] border-b border-[#e6e3e6]">
                  <CustomInput
                    required={true}
                    value={tax}
                    type="number"
                    placeholder="0"
                    onChange={handleTax}
                    noBorder={false}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-[40%] flex justify-between">
                  <span>Shipping:</span>
                  <span>₦</span>
                </div>
                <div className="w-[60%] border-b border-[#e6e3e6]">
                  <CustomInput
                    required={true}
                    value={shipping}
                    type="number"
                    placeholder="0"
                    onChange={handleShipping}
                    noBorder={false}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-[40%] flex justify-between">
                  <span>Total:</span>
                  <span>₦</span>
                </div>
                <div className="w-[60%] border-b border-[#e6e3e6]">
                  <CustomInput
                    required={true}
                    value={total}
                    type="number"
                    placeholder="0"
                    onChange={handleTotal}
                    noBorder={false}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
        <div className="w-full mt-8">
          <button
            onClick={handleGenerateInvoice}
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
