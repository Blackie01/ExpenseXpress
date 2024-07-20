import React from "react";
import Loading from "./Loading";

interface ButtonProps {
  "data-testid"?: string;
  text: string;
  disabled?: Boolean;
  bgColor: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string;
  loading?: boolean;
}
const ActionButton = ({
  text,
  disabled,
  bgColor,
  onClick,
  width,
  loading,
  "data-testid": dataTestId,
}: ButtonProps) => {
  return (
    <button
      data-testid={dataTestId}
      onClick={onClick}
      className={`bg-${bgColor} text-white rounded-custom py-2 px-4 text-sm ${
        width ? width : "w-max"
      } h-max flex items-center justify-center cursor-pointer`}
    >
      {loading ? <Loading width={"1.25rem"} height={"1.25rem"} /> : text}
    </button>
  );
};

export default ActionButton;
