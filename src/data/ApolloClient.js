import { ApolloClient, InMemoryCache } from "@apollo/client";
import { MUTATION_URL } from "./heroku";

const client = new ApolloClient({
  uri: MUTATION_URL,
  cache: new InMemoryCache(),
});

export default client;
