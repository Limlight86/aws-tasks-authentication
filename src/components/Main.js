import React from "react";
import Controls from "./Controls";
import Task from "./Task";
import Modal from "./Modal";
import ShowModalButton from "./ShowModalButton";
import { useQuery, useMutation } from "@apollo/client";
import { TASKS_QUERY, CREATE_TASK_MUTATION, DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION} from "../data/TasksApi";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [taskDescription, setTaskDescription] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data } = useQuery(TASKS_QUERY);
  const [createTask] = useMutation(CREATE_TASK_MUTATION);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);
  const [updatedTask] = useMutation(UPDATE_TASK_MUTATION);

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
      refetchQueries: [{ query: TASKS_QUERY }],
    });
    setTaskDescription("");
    setIsModalOpen(false);
  };

  const handleDeleteClick = async (taskId) => {
    const didConfirm = window.confirm("Are you sure?");
    if (didConfirm) {
      deleteTask({
        variables: { id: taskId },
        refetchQueries: [{ query: TASKS_QUERY }],
      })
    }
  };

  const handleCheckboxClick = async (taskId, isCompleted) => {
    updatedTask({
      variables: { 
        id: taskId,
        completed: !isCompleted },
      refetchQueries: [{ query: TASKS_QUERY }],
    });
  };

  const handleDescriptionChange = async (taskId, newDescription) => {
    const url = `/tasks/${taskId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ description: newDescription }),
    });
    const updatedTask = await response.json();
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return updatedTask;
      } else {
        return task;
      }
    });
    // setTasks(updatedTasks);
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
              handleDeleteClick={() => handleDeleteClick(task.id)}
              handleCheckboxClick={() =>
                handleCheckboxClick(task.id, task.completed)
              }
              handleDescriptionChange={(event) =>
                handleDescriptionChange(task.id, event.target.value)
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
