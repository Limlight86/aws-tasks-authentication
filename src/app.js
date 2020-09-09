import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./data/ApolloClient";
import Main from "./components/Main";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
