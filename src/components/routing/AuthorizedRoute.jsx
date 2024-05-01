import { useContext } from "react";
import { Navigate } from "react-router-dom";
import * as R from "ramda";

import { UserContext } from "../../shared/context/UserContext";

export const AuthorizedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!R.isNil(user) && user.role === "MEMBER")
    return <Navigate to="/clothing" />;

  return children;
};
