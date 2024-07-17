import React from "react";

interface CustomInputProps {
    type: string;
    placeholder?: string;
    onChange: (value: any) => void;
    noBorder?: boolean;
    required?: boolean;
    value: any
}
const CustomInput: React.FC<CustomInputProps> = ({type, placeholder, onChange, noBorder, required, value}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }
    return(
        <input
        required={required}
        value={value}
        type={type}
        placeholder={placeholder}
        className={`border ${noBorder ? "border-[#ebe8eb]" : "border-white"} rounded-custom h-[40px] px-2 w-full text-sm focus:outline-none`}
        onChange={handleChange}
      />
    )
}

export default CustomInput