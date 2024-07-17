"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuProps {
  name: string;
  url: string;
}

const menu: MenuProps[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    name: "Transactions",
    url: "/transactions",
  },
  {
    name: "Invoice",
    url: "/invoice",
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <section className="bg-[#FAF9FA] h-full py-4 flex flex-col gap-12">
      <div>
        <Link href={'/'}>
        <h3 className="text-black font-semibold text-[20px] px-6">
          ExpenseXpress
        </h3>
        </Link>
        
      </div>
      <div className="flex flex-col">
        {menu.map((menu, index) => (
          <Link
            href={menu.url}
            key={index}
            className={`px-6 py-4 cursor-pointer ${
              pathname === menu.url
                ? "bg-white text-pink border-r-[2px] border-pink font-semibold"
                : ""
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
