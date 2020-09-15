import { gql } from "@apollo/client";

export const TASKS_API_URL = process.env.GATEWAY_URL;

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
  mutation UpdateTask($id: String!, $description: String, $completed: Boolean) {
    updateTask(id: $id, description: $description, completed: $completed) {
      id
      description
      completed
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
      description
      completed
    }
  }
`;
