'use client'
import { RootState } from "@/redux/store"
import React from "react"
import { useSelector } from "react-redux"

const Header: React.FC = () => {
    const username = useSelector((state: RootState) => state.auth.username)
    return (
        <section className="border-b border-[#FAF9FA] h-full w-full  flex justify-end items-center pr-6">
            <p className="sm:block hidden h-max">Hola, {username || 'user'}.</p>
        </section>
    )
}

export default Header