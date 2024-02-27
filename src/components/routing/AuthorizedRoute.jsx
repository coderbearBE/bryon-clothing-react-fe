import { useContext } from "react";
import * as R from "ramda";

import { UserContext } from "../../shared/context/UserContext";
import { Navigate } from "react-router-dom";

export const AuthorizedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!R.isNil(user) && user.role === "MEMBER")
    return <Navigate to="/clothing" />;

  return children;
};
