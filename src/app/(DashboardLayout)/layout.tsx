import React from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import SnackBar from "@/components/SnackBar";

const DashboardLayout = ({children}: {children: React.ReactNode;}) => {
    return (
        <main className="flex">
            <div className="h-[100vh] lg:w-[14%] fixed left-0 top-0 z-30">
                <Sidebar/>
            </div>
            <div className="lg:w-[86%] w-full lg:ml-[14%] min-h-[100vh] relative">
                <div className="h-[4rem] sticky top-0 w-full bg-white z-10"><Header/></div>
                <div className="py-8 sm:px-12 h-[92%] px-8">{children}</div>
            </div>
            <SnackBar/>
        </main>
    )
}

export default DashboardLayout