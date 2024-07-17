import React from "react";

interface LoadingProps {
  height: string;
  width: string;
}

const Loading: React.FC<LoadingProps> = ({ height, width }) => {
  return (
    <div className="flex justify-center text-center">
      <span
        style={{ height: height, width: width }}
        className="border-2 border-solid border-black border-b-white border-l-white rounded-full box-border inline-block animate-rotation"
      ></span>
    </div>
  );
};

export default Loading;
