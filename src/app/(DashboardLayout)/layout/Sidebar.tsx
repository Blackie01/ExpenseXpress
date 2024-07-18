// "use client";
// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface MenuProps {
//   name: string;
//   url: string;
// }

// const menu: MenuProps[] = [
//   {
//     name: "Dashboard",
//     url: "/dashboard",
//   },
//   {
//     name: "Transactions",
//     url: "/transactions",
//   },
//   {
//     name: "Invoice",
//     url: "/invoice",
//   },
// ];

// const Sidebar: React.FC = () => {
//   const pathname = usePathname();

//   return (
//     <section className="bg-[#FAF9FA] h-full py-4 flex flex-col gap-12">
//       <div>
//         <Link href={'/'}>
//         <h3 className="text-black font-semibold px-6 text-[20px] max-[1382px]:text-[16px] max-[1107px]:px-2">
//           ExpenseXpress
//         </h3>
//         </Link>

//       </div>
//       <div className="flex flex-col">
//         {menu.map((menu, index) => (
//           <Link
//             href={menu.url}
//             key={index}
//             className={`px-6 max-[1107px]:px-2 py-4 cursor-pointer ${
//               pathname === menu.url
//                 ? "bg-white text-pink border-r-[2px] border-pink font-semibold"
//                 : ""
//             }`}
//           >
//             {menu.name}
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Sidebar;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuProps {
  name: string;
  url: string;
}

const menu: MenuProps[] = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Transactions", url: "/transactions" },
  { name: "Invoice", url: "/invoice" },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="z-30 lg:bg-[#FAF9FA] h-full">
      <div className="block lg:hidden p-4 flex gap-8 fixed top-[0.2rem] left-[1rem] items-center">
        <button onClick={toggleDrawer} className="flex flex-col gap-1">
          <span className="h-[2px] w-[20px] bg-black"></span>
          <span className="h-[2px] w-[15px] bg-black"></span>
          <span className="h-[2px] w-[10px] bg-black"></span>
        </button>
        <h3 className="text-black font-semibold text-[18px] italic">ExpenseXpress</h3>
      </div>

      <div
        className={`fixed inset-0  transition-transform duration-300 transform bg-black bg-opacity-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:bg-transparent lg:flex lg:flex-col lg:gap-12 lg:bg-[#FAF9FA]`}
        onClick={toggleDrawer}
      >
        <section
          className="bg-[#FAF9FA] h-full py-4 flex flex-col gap-12 w-64 lg:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <Link href={"/"}>
              <h3 className="text-black italic font-semibold px-4 text-[20px] min-[1024px]:text-[16px] min-[1300px]:text-[20px]">
                ExpenseXpress
              </h3>
            </Link>
          </div>
          <div className="flex flex-col">
            {menu.map((menu, index) => (
              <Link
                href={menu.url}
                key={index}
                className={`px-4 py-4 cursor-pointer ${
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
      </div>
    </section>
  );
};

export default Sidebar;
