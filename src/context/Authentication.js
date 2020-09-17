import { getNullableType } from "graphql";
import React, { useState, useEffect, createContext } from "react";
import Auth from "../data/Auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(Auth.user);
  const [error, setErrorMessage] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const signedInUser = await Auth.currentAuthenticatedUser();
        setUser(signedInUser);
      } catch (error) {
        setUser(null);
        setErrorMessage(error.message);
      }
    };
    getCurrentUser();
  }, []);

  const signIn = async (email, password) => {
    try {
      const signedInUser = await Auth.signIn(email, password);
      setUser(signedInUser);
    } catch (error) {
      setErrorMessage(error.message);
      setUser(null);
    }
  };

  const signOut = async () => {
    await Auth.signOut();
    setUser(getNullableType);
  };

  const signUp = async (userName, password) => {
    try {
      Auth.signUp({ userName: email, password });
      const code = prompt("Input your confrimation code")
      await Auth.confirmSignUp({email, code})
      await signIn(email, password)
    } catch (error) {
      setUser(null);
      setErrorMessage(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, error, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
