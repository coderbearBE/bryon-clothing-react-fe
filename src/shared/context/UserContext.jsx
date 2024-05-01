import * as R from "ramda";
import { createContext, useEffect, useState } from "react";
import { useAxios } from "../../hooks";

export const UserContext = createContext({
  user: {},
  login: () => {},
});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const { post } = useAxios();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const authUser = JSON.parse(storedUser);

    if (!R.isEmpty(authUser)) setUser({ ...user, ...authUser });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (userData) => {
    try {
      const apiResponse = await post(`/users/login`, userData);

      if (R.isNil(apiResponse)) {
        throw new Error();
      }

      setUser({ ...user, ...apiResponse });
      localStorage.setItem("authUser", JSON.stringify(apiResponse));
    } catch (error) {
      throw new Error(
        `Geen correct email of paswoord ingegeven. Probeer opnieuw aub of contacteer het bestuur.`
      );
    }
  };

  return (
    <UserContext.Provider value={{ user: user, login: handleLogin }}>
      {children}
    </UserContext.Provider>
  );
}
