import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./data/ApolloClient";
import Main from "./components/Main";
import Header from "./components/Header";
import Authorization from "./components/Authorization";
import { AuthContextProvider } from "./context/Authentication";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Authorization>
          <Header />
          <Main />
        </Authorization>
      </AuthContextProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
