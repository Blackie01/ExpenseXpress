"use client";
import { setSnackBar } from "@/redux/snackBarSlice";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SnackBar: React.FC = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.snackBar.message);
  const status = useSelector((state: RootState) => state.snackBar.status);
  const display = useSelector((state: RootState) => state.snackBar.display);

  useEffect(() => {
    setTimeout(
      () =>
        dispatch(
          setSnackBar({
            message: "",
            status: false,
            display: false,
          })
        ),
      3000
    );
  }, [display === true]);

  return (
    <div
      className={`${display ? "block" : "hidden"} ${
        status ? "border-[green] text-[green]" : "border-pink text-pink"
      } text-semibold bg-white fixed top-[1rem] right-[1rem] border px-4 py-2 z-50 bg-white rounded-custom`}
    >
      {message}
    </div>
  );
};

export default SnackBar;
