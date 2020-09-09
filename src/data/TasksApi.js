import { gql } from "@apollo/client";

export const TASKS_API_URL = "https://just-apollo-server.herokuapp.com/graphql";

export const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      description
      completed
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($description: String!) {
    createTask(description: $description) {
      id
      description
      completed
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: Int!, $description: String, $completed: Boolean) {
    updateTask(id: $id, description: $description, completed: $completed) {
      id
      description
      completed
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
      description
      completed
    }
  }
`;
