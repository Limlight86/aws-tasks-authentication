import { ApolloClient, InMemoryCache } from "@apollo/client";
import { TASKS_API_URL } from "./TasksApi";

const client = new ApolloClient({
  uri: TASKS_API_URL,
  cache: new InMemoryCache(),
});

export default client;
