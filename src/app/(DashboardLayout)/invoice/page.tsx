"use client";
import CreateInvoice from "@/components/CreateInvoice";
import React, {useState} from "react";

const Invoice = () => {
    const [openInvoice, setOpenInvoice] = useState<boolean>(false);
    const handleOpenInvoice = () => {
        setOpenInvoice(!openInvoice);
      };
  return (
    <section>
      <h3 className="text-[24px] text-black">Invoice</h3>
      <div className="mt-8">
        <div onClick={handleOpenInvoice} className="px-6 py-8 bg-white w-max text-black border border-[#ebe8eb] rounded-custom cursor-pointer hover:border-black transition-all duration-300 ease-in-out">
            Create an Invoice
        </div>
      </div>
      <CreateInvoice openInvoiceCreator={openInvoice} setOpenInvoiceCreator={setOpenInvoice} />
    </section>
  );
};

export default Invoice;
