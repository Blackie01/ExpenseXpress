'use client'
import React, {useState} from "react"

interface DatePickerProps {
    "data-testid"?: string;
    selectedDate: string;
    onChange: (date: string) => void
    required?: boolean
    noBorder?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({selectedDate, onChange, required, noBorder, 'data-testid': dataTestId}) => {
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    return (
        <input
        data-testid={dataTestId}
        required={required}
        className={`${noBorder ? "border border-[#ebe8eb]" : ""} rounded-custom h-[40px] px-2 w-full text-sm focus:outline-none`}
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min="1900-01-01" 
        max="2100-12-31"
        />
    )
}

export default DatePicker