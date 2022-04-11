import React from "react";
import { useRecoilState } from "recoil";
// atoms
import alertAtom from "../recoil/atoms/alertAtom";
// pages
import HomePage from "./HomePage";
import LoginPage from "./LoginPage/LoginPage";

// ---------------------------------------------------------

function MainPageRouter() {
  const setAlert = useRecoilState(alertAtom)[1];

  let context;
  if (localStorage.getItem("access_token")) {
    context = <HomePage />;
  } else {
    setAlert({
      show: true,
      variant: "error",
      message: "Session expired. Please login to continue!",
    });
    context = <LoginPage />;
  }
  return context;
}

export default MainPageRouter;
