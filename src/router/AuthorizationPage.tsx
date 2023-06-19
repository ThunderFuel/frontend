// import React from "react";
// import Beta from "../pages/Beta";
// import useAuthToken from "hooks/useAuthToken";

const AuthorizationPage = ({ children }: any) => {
  /*
  const hasAuthToken = useAuthToken.getAuthTokenFromLocalStorage();
  if (!hasAuthToken) {
    return <Beta />;
  }
  */

  return children;
};

export default AuthorizationPage;
