import React from "react";
import Beta from "../pages/Beta";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthorizationPage = ({ children }: any) => {
  const hasAuthToken = useLocalStorage().getItem("auth_token");
  if (!hasAuthToken) {
    return <Beta />;
  }

  return children;
};

export default AuthorizationPage;
