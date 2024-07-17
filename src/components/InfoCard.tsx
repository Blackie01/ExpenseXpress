"use client";
import React from "react";

interface InfoCardProps {
  percentage?: string | number;
  memo?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ percentage, memo }) => {
  return (
    <div className="px-4 py-2 bg-white text-black border border-[#ebe8eb] rounded-custom cursor-pointer hover:border-black transition-all duration-300 ease-in-out">
      <h3 className="text-[24px]">{percentage || 0}%</h3>
      <p className="text-sm">{memo}</p>
    </div>
  );
};

export default InfoCard;
