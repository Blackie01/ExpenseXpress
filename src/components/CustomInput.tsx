import React from "react";

interface CustomInputProps {
    'data-testid'?: string;
    type: string;
    placeholder?: string;
    onChange: (value: any) => void;
    noBorder?: boolean;
    required?: boolean;
    value: any
}
const CustomInput: React.FC<CustomInputProps> = ({type, placeholder, onChange, noBorder, required, value, 'data-testid': dataTestId,}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }
    return(
        <input
        data-testid={dataTestId}
        required={required}
        value={value}
        type={type}
        placeholder={placeholder}
        className={` ${noBorder ? "border border-[#ebe8eb]" : ""} rounded-custom h-[40px] px-2 w-full text-sm focus:outline-none`}
        onChange={handleChange}
      />
    )
}

export default CustomInput