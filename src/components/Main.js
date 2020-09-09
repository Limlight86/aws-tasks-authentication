import React from "react";
import Controls from "./Controls";
import Task from "./Task";
import Modal from "./Modal";
import ShowModalButton from "./ShowModalButton";
import { useQuery } from "@apollo/client";
import { TASKS_QUERY } from "../data/TasksApi";

const Main = () => {
  const [tasks, setTasks] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [taskDescription, setTaskDescription] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data } = useQuery(TASKS_QUERY);

  const fetchTasks = async () => {
    const url = `/tasks`;
    const response = await fetch(url);
    const data = await response.json();
    setTasks(data);
  };

  const handleModalClick = (event) => {
    const wasTheClickOutsideTheForm = !event.target.closest("form");
    if (wasTheClickOutsideTheForm) {
      setIsModalOpen(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const url = `/tasks`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ description: taskDescription }),
    });
    const newTask = await response.json();
    setTasks([newTask, ...tasks]);
    setTaskDescription("");
    setIsModalOpen(false);
  };

  const handleDeleteClick = async (taskId) => {
    const didConfirm = window.confirm("Are you sure?");
    if (didConfirm) {
      const url = `/tasks/${taskId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      }
    }
  };

  const handleCheckboxClick = async (taskId, isCompleted) => {
    const url = `/tasks/${taskId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ completed: !isCompleted }),
    });
    const updatedTask = await response.json();
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
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
    setTasks(updatedTasks);
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = (data?.tasks || []).filter(task=> {
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
