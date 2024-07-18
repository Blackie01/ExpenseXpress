'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "./CustomInput";
import { useDispatch } from "react-redux";
import { setUsername } from "@/redux/authSlice";
import { RootState } from "@/redux/store";

const Login: React.FC = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState<string | undefined>()
  const handleInputValue = (value: string) => {
    setInputValue(value)
  }
  
  const goToDashboard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setUsername({username: inputValue}))
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col gap-4 w-[25rem] max-[462px]:w-[90%] p-4 items-center m-auto">
      <h3 className="text-pink font-semibold text-[20px]">ExpenseXpress</h3>
      <p>Gain Access</p>

      <form onSubmit={goToDashboard} className="flex flex-col gap-4 mt-8 w-full">
        <CustomInput noBorder={true} type="text" placeholder="Your name" onChange={handleInputValue} value={inputValue}/>
        <button className="bg-pink rounded-custom text-[12px] h-[40px] text-white hover:bg-[#f24970] transition-all duration-300 ease-in-out">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Login;
