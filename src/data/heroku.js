import { gql } from "@apollo/client";

export const MUTATION_URL = "https://just-apollo-server.herokuapp.com/graphql";

export const MUTATION_QUERY = gql`
  query Tasks {
    tasks {
      id
      description
      completed
    }
  }
  mutation CreateTask($description: String!) {
    createTask(description: $description) {
      id
      description
      completed
    }
  }
  mutation UpdateTask($id: Int!, $description: String, $completed: Boolean) {
    updateTask(id: $id, description: $description, completed: $completed) {
      id
      description
      completed
    }
  }
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
      description
      completed
    }
  }
`;
