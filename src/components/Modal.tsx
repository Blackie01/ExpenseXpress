'use client'
import React, { ReactNode } from "react";
import Overlay from "./Overlay";

interface ModalProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    children: ReactNode;
    width?: string;
}

const Modal = ({ openModal, setOpenModal, children, width }: ModalProps) => {
  return (
    <Overlay
      darkened={true}
      openOverlay={openModal}
      setOpenOverlay={setOpenModal}
    >
      <div
        className={`absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 gap-8 ${
          width ? `w-[${width}]` : "w-1/3 min-w-[33.9rem]"
        } rounded-custom bg-white border border-grey400 p-6 shadow-dialogShadow`}
      >
        {children}
      </div>
    </Overlay>
  );
}

export default Modal
