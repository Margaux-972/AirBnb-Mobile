import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const [userToken, setUserToken] = useState("");

  const login = async (id, token) => {
    setUserID(id);
    setUserToken(token);
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("userID", id);
    // return console.log("connecté");
  };

  const logout = async (id, token) => {
    setUserID("");
    setUserToken("");
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userID");
    // return console.log("déconnecté");
  };
  // UseEffect A retester
  useEffect(() => {
    const getAsyncUserToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const id = await AsyncStorage.getItem("userID");
      if (token && id) {
        setUserToken(token);
        setUserID(id);
      }
    };
    getAsyncUserToken();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, userID, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
