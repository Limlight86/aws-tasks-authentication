import React from "react";
import Controls from "./Controls";
import Task from "./Task";
import Modal from "./Modal";
import ShowModalButton from "./ShowModalButton";
import { useQuery, useMutation } from "@apollo/client";
import {
  TASKS_QUERY,
  CREATE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
} from "../data/TasksApi";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [taskDescription, setTaskDescription] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data } = useQuery(TASKS_QUERY);
  const [createTask] = useMutation(CREATE_TASK_MUTATION, {
    update(cache, mutationResult) {
      const { tasks } = cache.readQuery({ query: TASKS_QUERY });
      const newTask = mutationResult.data.createTask;
      cache.writeQuery({
        query: TASKS_QUERY,
        data: { tasks: [newTask, ...tasks] },
      });
    },
  });
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    update(cache, mutationResult) {
      const { tasks } = cache.readQuery({ query: TASKS_QUERY });
      const deletedTask = mutationResult.data.deleteTask;
      cache.writeQuery({
        query: TASKS_QUERY,
        data: { tasks: tasks.filter((task) => task.id !== deletedTask.id) },
      });
    },
  });
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    update(cache, mutationResult) {
      const { tasks } = cache.readQuery({ query: TASKS_QUERY });
      const updatedTask = mutationResult.data.updateTask;
      cache.writeQuery({
        query: TASKS_QUERY,
        data: {
          tasks: tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        },
      });
    },
  });

  const handleModalClick = (event) => {
    const wasTheClickOutsideTheForm = !event.target.closest("form");
    if (wasTheClickOutsideTheForm) {
      setIsModalOpen(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    createTask({
      variables: { description: taskDescription },
      optimisticResponse: {
        __typename: "Mutation",
        createTask: {
          __typename: "Task",
          completed: false,
          description: taskDescription,
          id: 0,
        },
      },
    });
    setTaskDescription("");
    setIsModalOpen(false);
  };

  const handleDeleteClick = async (task) => {
    const didConfirm = window.confirm("Are you sure?");
    if (didConfirm) {
      deleteTask({
        variables: { id: task.id },
        optimisticResponse: {
          __typename: "Mutation",
          deleteTask: {
            __typename: "Task",
            completed: task.completed,
            description: task.description,
            id: task.id,
          },
        },
      });
    }
  };

  const handleCheckboxClick = async (task) => {
    updateTask({
      variables: {
        id: task.id,
        completed: !task.completed,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateTask: {
          __typename: "Task",
          completed: !task.completed,
          description: task.description,
          id: task.id,
        },
      },
    });
  };

  const handleDescriptionChange = async (task, newDescription) => {
    updateTask({
      variables: {
        id: task.id,
        description: newDescription,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateTask: {
          __typename: "Task",
          completed: task.completed,
          description: newDescription,
          id: task.id,
        },
      },
    });
  };

  const filteredTasks = (data?.tasks || []).filter((task) => {
    const doesTheSearchTermMatch = task.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isTheSelectedStatusAll = selectedStatus === "All";
    const doesTheSelectedStatusMatch =
      (selectedStatus === "Completed" && task.completed) ||
      (selectedStatus == "Incomplete" && !task.completed);
    return (
      (isTheSelectedStatusAll || doesTheSelectedStatusMatch) &&
      doesTheSearchTermMatch
    );
  });

  return (
    <>
      <main>
        <Controls
          selectedStatus={selectedStatus}
          searchTerm={searchTerm}
          setSelectedStatus={setSelectedStatus}
          setSearchTerm={setSearchTerm}
        />
        <ul id="tasks-list">
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              description={task.description}
              completed={task.completed}
              handleDeleteClick={() => handleDeleteClick(task)}
              handleCheckboxClick={() => handleCheckboxClick(task)}
              handleDescriptionChange={(event) =>
                handleDescriptionChange(task, event.target.value)
              }
            />
          ))}
        </ul>
        <ShowModalButton setIsModalOpen={setIsModalOpen} />
      </main>
      <Modal
        isModalOpen={isModalOpen}
        handleModalClick={handleModalClick}
        handleFormSubmit={handleFormSubmit}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
      />
    </>
  );
};

export default Main;
