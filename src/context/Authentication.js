import React from "react";
import Auth from "../data/Auth";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(Auth.user);

  const signIn = async (email, password) => {
    try {
      const signedInUser = await Auth.signIn(email, password);
      setUser(signedInUser);
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
