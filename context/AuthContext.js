import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const [userToken, setUserToken] = useState("");

  const login = (id, token) => {
    setUserID(id);
    setUserToken(token);
    // return console.log("connecté");
  };

  const logout = (id, token) => {
    setUserID("");
    setUserToken("");
    // return console.log("déconnecté");
  };

  return (
    <AuthContext.Provider
      value={{ setUserID, setUserToken, login, logout, userID, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
